import {Database} from './config'
import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";

mysql
  .createConnection({
    user: Database.username,
    password: Database.password,
  })
  .then((connection) => {
    connection.query("CREATE DATABASE IF NOT EXISTS lawyers;");
  }); 

const db = new Sequelize("lawyers", Database.username, Database.password, {
  host: Database.host,
  dialect: "mysql",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
  logging: console.log,
});

/* db.sync();  */
/* db.sync({ force: true });   */
export default db;