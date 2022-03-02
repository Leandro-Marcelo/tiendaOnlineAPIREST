const mysql = require("mysql2");
const config = require("./index");

const connection = mysql.createConnection({
  host: config.db_host,
  port: config.db_port,
  user: config.db_username,
  password: config.db_password,
  database: config.db_name,
});

function query(sql, data) {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, function (error, result) {
      error ? reject(error.sqlMessage) : resolve(result);
    });
  });
}

async function getAll() {
  try {
    const products = await query(`SELECT * FROM products`);
    return products;
  } catch (error) {
    return { error, success: false };
  }
}

async function likeName(tableName, input) {
  try {
    return await query(
      `SELECT * FROM ${tableName} WHERE name LIKE "%${input}%"`
    );
  } catch (error) {
    return error;
  }
}

async function limitando(tableName, startingLimit, resultsPerPage) {
  try {
    return await query(
      `SELECT * FROM ${tableName} LIMIT ${startingLimit}, ${resultsPerPage}`
    );
  } catch (error) {
    return error;
  }
}
async function filterCategory(tableName, idCategory) {
  try {
    return await query(
      `SELECT * FROM ${tableName} WHERE idCategory=${idCategory}`
    );
  } catch (error) {
    return error;
  }
}

async function sortingName(tableName, sort_by) {
  try {
    return await query(`SELECT * FROM ${tableName} order by name ${sort_by}`);
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAll,
  likeName,
  limitando,
  filterCategory,
  sortingName,
};
