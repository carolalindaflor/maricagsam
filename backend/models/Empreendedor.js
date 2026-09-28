import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Empreendedor = sequelize.define(
  "Empreendedor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nacionalidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "empreendedores",
    timestamps: true,
  }
);

export default Empreendedor;