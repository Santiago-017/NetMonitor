"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark";

    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("bg-dark", "text-white");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode === null) return;

    const newMarkMode = !darkMode;
    setDarkMode(newMarkMode);

    if (newMarkMode) {
      document.body.classList.add("bg-dark", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <html lang="es">
      <body className="min-vh-100 d-flex flex-column align-items-center justify-content-center transition-all">
        {/* Botón para cambiar modo oscuro */}
        {darkMode !== null && (
          <button onClick={toggleDarkMode} className="btn btn-secondary position-absolute top-0 end-0 m-3">
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>
        )}

        {/* Contenido de la aplicación */}
        {children}
      </body>
    </html>
  );
}
