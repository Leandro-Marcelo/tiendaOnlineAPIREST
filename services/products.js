const {
  getAll,
  likeName,
  limitando,
  filterCategory,
  sortingName,
} = require("../config/db");

class Products {
  async read() {
    const products = await getAll("product");
    return products;
  }

  async readCategory() {
    const categories = await getAll("category");
    return categories;
  }

  async paging(pageNumber) {
    const resultsPerPage = 9;
    const products = await getAll("product");
    const categories = await getAll("category");
    console.log(products);
    if (products.error) return products;
    const total = products.length;
    const pages = Math.ceil(total / resultsPerPage);
    let page = Number(pageNumber);
    if (isNaN(page)) return { success: false };
    if (page > pages || page < 1) return { success: false };
    let startingLimit = (page - 1) * resultsPerPage;
    let results = await limitando("product", startingLimit, resultsPerPage);
    return { page, pages, total, results, success: true, categories };
  }

  async filtering(category) {
    let products = await filterCategory("product", category);
    /* sacamos las categorias y lo retornamos para que se renderize todo el menu de categorias al momento de navegar en una categoria, si no se lo pasamos como no existe products.category entonces perdías el menu */
    const categories = await getAll("category");
    return { results: products, categories };
  }

  async sorting(sort_by) {
    console.log(sort_by);
    if (sort_by == "asc" || sort_by == "desc") {
      let products = await sortingName("product", sort_by);
      return { results: products };
    }
    return { error: "Esta página no existe" };
  }

  async search(payload) {
    let products = await likeName("product", payload);
    return { results: products };
  }
}

module.exports = Products;
