const { likeName, getAll, limitando } = require("../config/db");

class Products {
  async search(payload) {
    let results = await likeName("products", payload);
    return { results };
  }
  async paging(pageNumber) {
    const resultsPerPage = 9;
    const result = await getAll();
    const total = result.length;
    const pages = Math.ceil(total / resultsPerPage);
    let page = Number(pageNumber);
    if (page > pages || page < 1) return { success: false };
    let startingLimit = (page - 1) * resultsPerPage;
    let results = await limitando("products", startingLimit, resultsPerPage);
    return { success: true, page, pages, total, results };
  }
}

module.exports = Products;
