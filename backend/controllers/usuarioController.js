import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

// ========================================
// LISTAR USUÁRIOS
// ========================================
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ["id", "nome", "email", "telefone"],
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);

    res.status(500).json({
      error: "Erro ao listar usuários.",
    });
  }
}

// ========================================
// CADASTRAR USUÁRIO
// ========================================
export async function cadastrarUsuario(req, res) {
  try {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: "Nome, email e senha são obrigatórios.",
      });
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        error: "Este email já está cadastrado.",
      });
    }

    // 🔐 Transformar a senha em hash antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      telefone,
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    res.status(500).json({
      error: "Erro ao cadastrar usuário.",
    });
  }
}

// ========================================
// LOGIN DO USUÁRIO
// ========================================
export async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios.",
      });
    }

    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        error: "Email ou senha inválidos.",
      });
    }

    // 🔐 Comparar senha digitada com o hash salvo
    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        error: "Email ou senha inválidos.",
      });
    }

    res.json({
      message: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    res.status(500).json({
      error: "Erro ao fazer login.",
    });
  }
}