"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.Database = void 0;
require("dotenv/config");
exports.Database = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
};
exports.SECRET = process.env.SECRET;
