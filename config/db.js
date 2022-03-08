const mysql = require("mysql2");
const config = require("./index");

const connection = mysql.createConnection({
  host: config.db_host,
  user: config.db_username,
  password: config.db_password,
  database: config.db_name,
});

connection.connect((err) => {
  if (err) {
    console.log(`Error DB: `, err);
    return err;
  }
  console.log(`Conexion establecida!`);
});

function query(sql, data) {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, function (error, result, fields) {
      error ? reject(error.sqlMessage) : resolve(result);
    });
  });
}

async function getAll() {
  try {
    const result = await query(`SELECT * FROM product`);
    return result;
  } catch (error) {
    return { error };
  }
}

async function limitando(tableName, startingLimit, resultsPerPage) {
  try {
    const result = await query(
      `SELECT * FROM ${tableName} LIMIT ${startingLimit}, ${resultsPerPage}`
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function filterCategory(tableName, category) {
  try {
    const result = await query(
      `SELECT * FROM ${tableName} WHERE category=${category}`
    );
    return result;
  } catch (error) {
    return { error };
  }
}

async function sortingName(tableName, sort_by) {
  try {
    const result = await query(
      `SELECT * FROM ${tableName} order by name ${sort_by}`
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function likeName(tableName, input) {
  try {
    const result = await query(
      `SELECT * FROM ${tableName} WHERE name LIKE "%${input}%"`
    );
    return result;
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getAll,
  likeName,
  limitando,
  filterCategory,
  sortingName,
};
