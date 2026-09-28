import { Router } from "express";
import Empreendedor from "../models/Empreendedor.js";

const router = Router();

// GET - Listar empreendedores
router.get("/", async (_req, res) => {
  try {
    const empreendedores = await Empreendedor.findAll();

    return res.json(empreendedores);
  } catch (error) {
    console.error("Erro ao listar empreendedores:", error);

    return res.status(500).json({
      message: "Erro ao listar empreendedores"
    });
  }
});

// POST - Cadastrar empreendedor
router.post("/", async (req, res) => {
  try {
    const {
      nome,
      nacionalidade,
      descricao,
      telefone,
      foto
    } = req.body;

    const novoEmpreendedor = await Empreendedor.create({
      nome,
      nacionalidade,
      descricao,
      telefone,
      foto
    });

    return res.status(201).json(novoEmpreendedor);
  } catch (error) {
    console.error("Erro ao cadastrar empreendedor:", error);

    return res.status(500).json({
      message: "Erro ao cadastrar empreendedor",
      error: error.message
    });
  }
});

// PUT - Atualizar empreendedor
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const empreendedor = await Empreendedor.findByPk(id);

    if (!empreendedor) {
      return res.status(404).json({
        message: "Empreendedor não encontrado"
      });
    }

    await empreendedor.update(req.body);

    return res.json(empreendedor);
  } catch (error) {
    console.error("Erro ao atualizar empreendedor:", error);

    return res.status(500).json({
      message: "Erro ao atualizar empreendedor",
      error: error.message
    });
  }
});

export default router;