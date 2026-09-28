import sequelize from "./models/index.js";
import Produto from "./models/Produto.js";

try {
  await sequelize.sync();

  await Produto.update(
    {
      nome: "Aula de Piano e Canto",
      categoria: "Educação",
      descricao: "Aulas de piano e canto",
      foto: "/assets/Isa Lopez.jpeg",
    },
    {
      where: { id: 6 },
    }
  );

  await Produto.destroy({
    where: { id: 7 },
  });

  console.log("✅ Serviço da Isa corrigido com sucesso!");
} catch (error) {
  console.error("❌ Erro:", error);
} finally {
  await sequelize.close();
}