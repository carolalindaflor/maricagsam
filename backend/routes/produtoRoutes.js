import express from "express";
import Produto from "../models/Produto.js";

const router = express.Router();

// Listar produtos
router.get("/", async (_req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({
      error: "Erro interno ao buscar produtos.",
    });
  }
});

// Cadastrar produto
router.post("/", async (req, res) => {
  try {
    const {
      nome,
      categoria,
      descricao,
      preco,
      foto,
      telefone,
      empreendedorId,
    } = req.body;

    if (!nome || !categoria || !empreendedorId) {
      return res.status(400).json({
        error: "Nome, categoria e empreendedorId são obrigatórios.",
      });
    }

    const produto = await Produto.create({
      nome,
      categoria,
      descricao,
      preco,
      foto,
      telefone,
      empreendedorId,
    });

    res.status(201).json(produto);
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({
      error: "Erro interno ao cadastrar produto.",
    });
  }
});
 
// Excluir produto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        error: "Produto não encontrado.",
      });
    }

    await produto.destroy();

    res.json({
      message: "Produto excluído com sucesso.",
      id,
    });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);

    res.status(500).json({
      error: "Erro interno ao excluir produto.",
    });
  }
});

export default router;
