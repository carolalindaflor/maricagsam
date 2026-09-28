import sequelize from "./models/index.js";
import Produto from "./models/Produto.js";
import { Op } from "sequelize";

try {
  await sequelize.sync();

  await Produto.update(
    { foto: "/assets/Natalia Cuello.jpeg" },
    {
      where: {
        id: {
          [Op.in]: [4, 5],
        },
      },
    }
  );

  await Produto.update(
    { foto: "/assets/Isa Lopez.jpeg" },
    {
      where: {
        id: {
          [Op.in]: [6, 7],
        },
      },
    }
  );

  console.log("Fotos dos produtos corrigidas!");
} catch (error) {
  console.error("Erro:", error);
} finally {
  await sequelize.close();
}
