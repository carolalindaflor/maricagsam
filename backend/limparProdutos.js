import sequelize from "./models/index.js";
import Produto from "./models/Produto.js";

const idsParaExcluir = [3, 8, 9, 10, 11, 12];

try {
  await sequelize.sync();

  const quantidade = await Produto.destroy({
    where: {
      id: idsParaExcluir,
    },
  });

  console.log(`Produtos excluídos: ${quantidade}`);

  const produtos = await Produto.findAll({
    order: [["id", "ASC"]],
  });

  console.table(
    produtos.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      empreendedorId: produto.empreendedorId,
    }))
  );
} catch (error) {
  console.error("Erro:", error);
} finally {
  await sequelize.close();
}
