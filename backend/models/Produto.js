import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Produto = sequelize.define("Produto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  preco: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  empreendedorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Produto;