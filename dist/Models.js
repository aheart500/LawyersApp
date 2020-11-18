"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = exports.LawyerModel = exports.ClientModel = void 0;
var sequelize_1 = require("sequelize");
var MySQL_1 = __importDefault(require("./MySQL"));
var LawyerModel = MySQL_1.default.define('Lawyer', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    slug: sequelize_1.DataTypes.TEXT({ length: 'long' }),
    name: sequelize_1.DataTypes.STRING
});
exports.LawyerModel = LawyerModel;
var ImageModel = MySQL_1.default.define('Image', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    path: sequelize_1.DataTypes.TEXT({ length: 'long' }),
});
exports.ImageModel = ImageModel;
var ClientModel = MySQL_1.default.define('Client', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    code: sequelize_1.DataTypes.STRING,
    date: sequelize_1.DataTypes.STRING,
    fees: sequelize_1.DataTypes.FLOAT,
    forward_payment: sequelize_1.DataTypes.FLOAT,
    name: sequelize_1.DataTypes.STRING,
    verdict: sequelize_1.DataTypes.TEXT({ length: 'long' })
});
exports.ClientModel = ClientModel;
LawyerModel.hasMany(ClientModel);
ClientModel.hasMany(ImageModel);
ClientModel.belongsTo(LawyerModel);
