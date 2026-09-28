import sequelize from "./database.js";
import "./models/Empreendedor.js";

try {
  await sequelize.authenticate();

  await sequelize.sync();

  console.log("✅ SQLite + Sequelize funcionando!");
  console.log("✅ Tabela Empreendedor criada com sucesso!");

  await sequelize.close();
} catch (error) {
  console.error("❌ Erro no banco:", error);
}