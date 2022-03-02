const mysql = require("mysql2");
const config = require("./index");

const connection = mysql.createConnection({
  host: config.db_host,
  port: config.db_port,
  user: config.db_username,
  password: config.db_password,
  database: config.db_name,
});
