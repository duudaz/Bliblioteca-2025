import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
    'funcionario',
    {
        idfuncionario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomefuncionario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        salario: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            defaultValue: 0
        },
        contratacao: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        demissao: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: true
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: 'funcionario',
        timestamps: false
    }
);
