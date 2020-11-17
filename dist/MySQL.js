"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var sequelize_1 = require("sequelize");
var promise_1 = __importDefault(require("mysql2/promise"));
promise_1.default
    .createConnection({
    user: config_1.Database.username,
    password: config_1.Database.password,
})
    .then(function (connection) {
    connection.query("CREATE DATABASE IF NOT EXISTS lawyers;");
});
var db = new sequelize_1.Sequelize("lawyers", config_1.Database.username, config_1.Database.password, {
    host: config_1.Database.host,
    dialect: "mysql",
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
    },
    logging: console.log,
});
/* db.sync();  */
/* db.sync({ force: true });   */
exports.default = db;
