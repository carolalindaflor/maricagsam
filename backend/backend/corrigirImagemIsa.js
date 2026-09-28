import sequelize from "./models/index.js";
import Produto from "./models/Produto.js";

try {
  await sequelize.sync();

  await Produto.update(
    {
      foto: "/assets/aula canto-piano.jpeg",
    },
    {
      where: { id: 6 },
    }
  );

  console.log("✅ Imagem da Aula de Piano e Canto atualizada!");
} catch (error) {
  console.error("❌ Erro:", error);
} finally {
  await sequelize.close();
}