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

  async paging(pageNumber) {
    const resultsPerPage = 9;
    const result = await getAll();
    console.log(result);
    if (result.error) return { error: result.error };
    const total = result.length;
    const pages = Math.ceil(total / resultsPerPage);
    let page = Number(pageNumber);
    if (isNaN(page)) return { success: false };
    if (page > pages || page < 1) return { success: false };
    let startingLimit = (page - 1) * resultsPerPage;
    let results = await limitando("product", startingLimit, resultsPerPage);
    return { success: true, page, pages, total, results };
  }

  async filtering(category) {
    let results = await filterCategory("product", category);
    return { results };
  }

  async sorting(sort_by) {
    console.log(sort_by);
    if (sort_by == "asc" || sort_by == "desc") {
      let results = await sortingName("product", sort_by);
      return { results };
    }
    return { error: "Esta página no existe" };
  }

  async search(payload) {
    let results = await likeName("product", payload);
    return { results };
  }
}

module.exports = Products;
