const { likeName } = require("../config/db");

class Products {
  async search(payload) {
    let results = await likeName("products", payload);
    return { results };
  }
}

module.exports = Products;
