"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("sequelize/types");
var MySQL_1 = __importDefault(require("../MySQL"));
var Lawyer = MySQL_1.default.define('Lawyer', {
    id: {
        primaryKey: true,
        type: types_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    slug: types_1.DataTypes.TEXT({ length: 'long' }),
    name: types_1.DataTypes.STRING
});
var Image = MySQL_1.default.define('Image', {
    id: {
        primaryKey: true,
        type: types_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    path: types_1.DataTypes.TEXT({ length: 'long' }),
});
var Client = MySQL_1.default.define('Client', {
    id: {
        primaryKey: true,
        type: types_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    code: types_1.DataTypes.STRING,
    date: types_1.DataTypes.STRING,
    fees: types_1.DataTypes.FLOAT,
    forward_payment: types_1.DataTypes.FLOAT,
    name: types_1.DataTypes.STRING,
    verdict: types_1.DataTypes.TEXT({ length: 'long' })
});
exports.default = { Client: Client, Lawyer: Lawyer, Image: Image };
