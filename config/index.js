/* Esto nos indica que a partir de ahora, ya podemos leer el archivo .env y cargar los procesos.*/
require("dotenv").config();

const config = {
  port: process.env.PORT,
  db_password: process.env.DB_PASSWORD,
  db_username: process.env.DB_USERNAME,
  db_host: process.env.DD_HOST,
  db_name: process.env.DB_NAME,
};

module.exports = config;
