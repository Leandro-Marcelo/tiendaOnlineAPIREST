const express = require("express");
const Products = require("../services/products");

function products(app) {
  const router = express.Router();
  const productsService = new Products();
  app.use("/products", router);

  router.get("/api/page", async (req, res) => {
    const { search } = req.query;
    const { page } = req.query;
    const { idCategory } = req.query;
    const { sort_by } = req.query;
    console.log(page, search, idCategory, sort_by);
    if (search) {
      let data = await productsService.search(search);
      return res.send(data);
    }
    if (page) {
      const data = await productsService.paging(page);
      return res.send(data);
    }
  });
}

module.exports = products;
