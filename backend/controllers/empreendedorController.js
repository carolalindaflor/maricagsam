import Empreendedor from "../models/Empreendedor.js";

// Listar todos
export const listarEmpreendedores = async (_req, res) => {
  try {
    const empreendedores = await Empreendedor.findAll();
    return res.json(empreendedores);
  } catch (error) {
    console.error("Erro ao listar empreendedores:", error);
    return res.status(500).json({ error: "Erro interno ao buscar empreendedores." });
  }
};

// Cadastrar novo
export const criarEmpreendedor = async (req, res) => {
  try {
    const { nome, nacionalidade, descricao, telefone, foto } = req.body;

    if (!nome || !nacionalidade) {
      return res.status(400).json({ error: "Os campos 'nome' e 'nacionalidade' são obrigatórios." });
    }

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
    return res.status(500).json({ error: "Erro interno ao cadastrar empreendedor." });
  }
};