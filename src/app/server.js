import next from "next";
import express from "express";

const app = express();
const nextApp = next({ dev: false });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
