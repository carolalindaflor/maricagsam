import sequelize from "./models/index.js";
import Produto from "./models/Produto.js";

try {
  await sequelize.sync();

  await Produto.update(
    {
      foto: "/assets/Terapeuticos.jpeg",
    },
    {
      where: { id: 4 },
    }
  );

  await Produto.update(
    {
      foto: "/assets/Taro.jpeg",
    },
    {
      where: { id: 5 },
    }
  );

  console.log("✅ Fotos da Natalia corrigidas com sucesso!");
} catch (error) {
  console.error("❌ Erro:", error);
} finally {
  await sequelize.close();
}