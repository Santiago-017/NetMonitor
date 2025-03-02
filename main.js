const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const path = require("path");
const http = require("http");

let mainWindow;
let serverProcess;

function checkServerReady(callback, retries = 10, delay = 2000) {
    if (retries === 0) {
        console.log("Servidor no respondió a tiempo. Abriendo la app de todas formas...");
        callback();
        return;
    }

    http.get("http://localhost:3000", (res) => {
        if (res.statusCode === 200) {
            console.log("Servidor Next.js está listo, abriendo la ventana...");
            callback();
        } else {
            console.log(`Servidor aún no está listo, esperando... (${retries} intentos restantes)`);
            setTimeout(() => checkServerReady(callback, retries - 1, delay), delay);
        }
    }).on("error", () => {
        console.log(`Servidor aún no está listo, esperando... (${retries} intentos restantes)`);
        setTimeout(() => checkServerReady(callback, retries - 1, delay), delay);
    });
}

app.whenReady().then(() => {
    console.log("Iniciando servidor de Next.js...");

    // Ejecutar npm start para iniciar Next.js
    serverProcess = exec("npm start", {
        cwd: path.join(__dirname), // Asegurar que esté en el directorio correcto
        shell: true, // Necesario en Windows
    });

    serverProcess.stdout.on("data", (data) => {
        console.log(`STDOUT: ${data}`);
    });

    serverProcess.stderr.on("data", (data) => {
        console.error(`STDERR: ${data}`);
    });

    // Esperar hasta que el servidor esté listo antes de abrir la ventana
    checkServerReady(() => {
        mainWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true,
            },
        });

        mainWindow.loadURL("http://localhost:3000");

        mainWindow.on("closed", () => {
            mainWindow = null;
        });
    });
});

// Cerrar el servidor de Next.js al cerrar Electron
app.on("window-all-closed", () => {
    if (serverProcess) {
        console.log("Cerrando servidor de Next.js...");
        serverProcess.kill();
    }
    if (process.platform !== "darwin") {
        app.quit();
    }
});
