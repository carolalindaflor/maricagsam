import express from "express";
import cors from "cors";
import sequelize from "./models/index.js";

import empreendedorRoutes from "./routes/empreendedorRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    message: "API GSAM Maricá funcionando com sucesso!",
    status: "online",
  });
});

// Rotas da API
app.use("/empreendedores", empreendedorRoutes);
app.use("/produtos", produtoRoutes);
app.use("/usuarios", usuarioRoutes);

// Sincronização do banco de dados e inicialização do servidor
sequelize
  .sync()
  .then(() => {
    console.log("💾 Banco de dados SQLite sincronizado com sucesso!");

    const servidor = app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });

    servidor.on("error", (error) => {
      console.error("❌ ERRO AO ABRIR A PORTA:", error.message);
    });

    servidor.on("listening", () => {
      console.log(
        `✅ EVENTO LISTENING: porta ${port} realmente aberta e pronta para receber requisições.`
      );
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar banco de dados:", error);
  });
