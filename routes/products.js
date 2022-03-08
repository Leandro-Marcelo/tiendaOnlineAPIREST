const express = require("express");
const Products = require("../services/products");

function products(app) {
  const router = express.Router();
  const productsService = new Products();
  app.use("/products", router);

  router.get("/", async (req, res) => {
    const products = await productsService.read();
    console.log(products);
    if (products.error) {
      const err = products.error;
      return res
        .status(500)
        .json({ statusText: "Error de Sintaxys en MySQL", error: err });
    }
    return res.status(200).json({ statusText: "Productos", products });
  });

  router.get("/api/page", async (req, res) => {
    /* console.log(req.query); */
    const { search } = req.query;
    const { page } = req.query;
    const { category } = req.query;
    const { sort_by } = req.query;
    /* Con esta validación corrigo si alguien va a http://localhost:4000/products/api/page/?todobien 
    ya que solamente se permiten estas query en mi objeto de req.query, por lo tanto, como no esta a ningun if
    return que la página no fue encontrada */
    req.query = {
      ["search"]: req.query.search,
      ["sort_by"]: req.query.sort_by,
      ["page"]: req.query.page,
      ["category"]: req.query.category,
    };
    if (page) {
      const data = await productsService.paging(page);
      if (data.error) {
        const err = data.error;
        return res
          .status(500)
          .json({ mensaje: "Error de Sintaxys en MySQL", error: err });
      }
      if (!data.success) {
        return res.status(404).json({ statusText: "Esta página no existe" });
      }
      return res.send(data);
    }
    if (category) {
      let data = await productsService.filtering(category);
      if (data.results.error) {
        const err = data.results.error;
        return res
          .status(500)
          .json({ statusText: "Error de Sintaxys en MySQL", error: err });
      }
      if (data.results.length < 1) {
        return res.status(404).json({ statusText: "No existe esta categoría" });
      }
      return res.send(data);
    }
    if (sort_by) {
      let data = await productsService.sorting(sort_by);
      if (data.error) {
        return res.status(404).json({ statusText: data.error });
      }
      return res.send(data);
    }
    if (search) {
      let data = await productsService.search(search);
      if (data.results.error) {
        const err = data.results.error;
        return res
          .status(500)
          .json({ statusText: "Error de Sintaxys en MySQL", error: err });
      }
      /* No sé porque cuando le pongo un status 200, aun así pasa al catch del frontend */
      if (data.results.length < 1) {
        return res
          .status(404)
          .json({ statusText: "Ningun producto matcheo con tu busqueda" });
      }
      return res.send(data);
    }
    if (search === "") {
      return res
        .status(404)
        .json({ statusText: "Ningun producto matcheo con tu busqueda" });
    }
  });
  router.get("*", (req, res) => {
    return res.status(404).json({ statusText: "Página no encontrada" });
  });
}

module.exports = products;
