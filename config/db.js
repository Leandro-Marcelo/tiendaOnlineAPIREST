const { Prohairesis } = require("prohairesis");
const env = require("./index");

const dataBase = new Prohairesis(env.CLEARDB_DATABASE_URL);

async function getAll() {
  try {
    const result = await dataBase.query(`SELECT * FROM products`);
    return result;
  } catch (error) {
    return error;
  }
}

async function likeName(tableName, input) {
  try {
    const result = await dataBase.query(
      `SELECT * FROM ${tableName} WHERE name LIKE "%${input}%"`
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function limitando(tableName, startingLimit, resultsPerPage) {
  try {
    const result = await dataBase.query(
      `SELECT * FROM ${tableName} LIMIT ${startingLimit}, ${resultsPerPage}`
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function filterCategory(tableName, idCategory) {
  try {
    const result = await dataBase.query(
      `SELECT * FROM ${tableName} WHERE idCategory=${idCategory}`
    );
    return result;
  } catch (error) {
    return error;
  }
}

async function sortingName(tableName, sort_by) {
  try {
    const result = await dataBase.query(
      `SELECT * FROM ${tableName} order by name ${sort_by}`
    );
    return result;
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
