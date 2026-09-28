import express from "express";

import {
  listarUsuarios,
  cadastrarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";

const router = express.Router();

// GET - listar usuários
router.get("/", listarUsuarios);

// POST - cadastrar usuário
router.post("/", cadastrarUsuario);

// POST - login
router.post("/login", loginUsuario);

export default router;