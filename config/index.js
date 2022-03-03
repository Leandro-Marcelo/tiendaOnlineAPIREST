require("dotenv").config();

module.exports = {
  CLEARDB_DATABASE_URL: process.env.CLEARDB_DATABASE_URL,
  port: process.env.PORT,
};
