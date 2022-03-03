const {
  getAll,
  likeName,
  limitando,
  filterCategory,
  sortingName,
} = require("../config/db");

class Products {
  async read() {
    const products = await getAll();
    return products;
  }

  async search(payload) {
    let results = await likeName("products", payload);
    return { results };
  }

  async paging(pageNumber) {
    try {
      const resultsPerPage = 9;
      const result = await getAll();
      const total = result.length;
      const pages = Math.ceil(total / resultsPerPage);
      let page = Number(pageNumber);
      if (isNaN(page)) return { success: false };
      if (page > pages || page < 1) return { success: false };
      let startingLimit = (page - 1) * resultsPerPage;
      let results = await limitando("products", startingLimit, resultsPerPage);
      return { success: true, page, pages, total, results };
    } catch (error) {
      return error;
    }
  }

  async filtering(idCategory) {
    let results = await filterCategory("products", idCategory);
    return { results };
  }

  async sorting(sort_by) {
    let results = await sortingName("products", sort_by);
    return { results };
  }
}

module.exports = Products;
