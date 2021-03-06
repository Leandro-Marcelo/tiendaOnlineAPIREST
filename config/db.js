const mysql = require("mysql2");
const config = require("./index");

const pool = mysql.createPool({
  host: config.db_host,
  user: config.db_username,
  database: config.db_name,
  password: config.db_password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function getAll(tableName) {
  const result = await query(`SELECT * FROM ${tableName}`);
  console.log(result);
  return result;
}

async function limitando(tableName, startingLimit, resultsPerPage) {
  const result = await query(
    `SELECT * FROM ${tableName} LIMIT ${startingLimit}, ${resultsPerPage};`
  );
  return result;
}

async function filterCategory(tableName, category) {
  const result = await query(
    `SELECT * FROM ${tableName} WHERE category=${category}`
  );
  return result;
}

async function sortingName(tableName, sort_by) {
  const result = await query(
    `SELECT * FROM ${tableName} order by name ${sort_by}`
  );
  console.log(result);
  return result;
}

async function likeName(tableName, input) {
  const result = await query(
    `SELECT * FROM ${tableName} WHERE name LIKE "%${input}%"`
  );
  return result;
}

module.exports = {
  getAll,
  likeName,
  limitando,
  filterCategory,
  sortingName,
};
