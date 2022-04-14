const express = require("express");
const Products = require("../services/products");

function products(app) {
    const router = express.Router();
    const productsService = new Products();
    app.use("/products", router);

    /**
     * @swagger
     * components:
     *    schemas:
     *      product:
     *        type: object
     *        properties:
     *          name:
     *            type: VARCHAR(255)
     *            description: The product name
     *          url_image:
     *            type: VARCHAR(255)
     *            description: The product image
     *          price:
     *            type: FLOAT
     *            description: The product price
     *          discount:
     *            type: INT
     *            description: The product discount
     *          category:
     *            type: INT
     *            description: The product category
     *        example:
     *          name: PISCO ALTO DEL CARMEN 70º
     *          url_image: https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg
     *          price: 9990
     *          discount: 0
     *          category: 2
     */
    /**
     * @swagger
     * components:
     *    schemas:
     *      category:
     *        type: object
     *        properties:
     *          name:
     *            type: VARCHAR(255)
     *            description: The product category name
     *        example:
     *          name: pisco
     */

    /**
     * @swagger
     * /products:
     *  get:
     *    summary: Gets all products.
     *    tags: [product]
     *    responses:
     *      200:
     *        description: Returns the products
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/product'
     */
    router.get("/", async (req, res) => {
        const products = await productsService.read();
        return res.status(200).json({ statusText: "Productos", products });
    });

    /**
     * @swagger
     * /products/category:
     *  get:
     *    summary: Gets all categories.
     *    tags: [category]
     *    responses:
     *      200:
     *        description: Returns the categories
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/category'
     */
    router.get("/category", async (req, res) => {
        const categories = await productsService.readCategory();
        return res.status(200).json({ statusText: "Categorias", categories });
    });

    /**
     * @swagger
     * /products/api/page/?page={page}:
     *  get:
     *    summary: Gets 9 products per page
     *    tags: [product]
     *    parameters:
     *      - in: path
     *        name: page
     *        required: true
     *        schema:
     *        type: string
     *        description: The page number [1 - 7]
     *    responses:
     *      200:
     *        description: Returns 9 products per page found in the results property
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/product'
     *      404:
     *        description: This page doesn't exist
     */
    router.get("/api/page", async (req, res) => {
        const { page } = req.query;
        const products = await productsService.paging(page);
        if (!products.success) {
            return res
                .status(404)
                .json({ statusText: "Esta página no existe" });
        }
        return res.status(200).json(products);
    });
    /**
     * @swagger
     * /products/api/category/?category={category}:
     *  get:
     *    summary: Returns the products filtered by category
     *    tags: [product]
     *    parameters:
     *      - in: path
     *        name: category
     *        required: true
     *        schema:
     *        type: string
     *        description: The category number [1 - 7]
     *    responses:
     *      200:
     *        description: returns the products according to their category, it's in the property results
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/product'
     *      404:
     *        description: This category doesn't exist
     */
    router.get("/api/category", async (req, res) => {
        const { category } = req.query;
        let products = await productsService.filtering(category);
        console.log(products);
        if (products.results.length < 1) {
            return res
                .status(404)
                .json({ statusText: "No existe esta categoría" });
        }
        return res.status(200).json(products);
    });
    /**
     * @swagger
     * /products/api/sort_by/?sort_by={sort_by}:
     *  get:
     *    summary: Returns all products in alphabetical order
     *    tags: [product]
     *    parameters:
     *      - in: path
     *        name: sort_by
     *        required: true
     *        schema:
     *        type: string
     *        description: The way of ordering [asc - desc]
     *    responses:
     *      200:
     *        description: Returns all products in alphabetical order, you choose the way, it's in the property results
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/product'
     *      404:
     *        description: This page doesn't exist
     */
    router.get("/api/sort_by", async (req, res) => {
        const { sort_by } = req.query;
        let products = await productsService.sorting(sort_by);
        if (products.error) {
            const err = products.error;
            return res.status(404).json({ statusText: err });
        }
        return res.json(products);
    });
    /**
     * @swagger
     * /products/api/search/?search={search}:
     *  get:
     *    summary: Returns the products containing the entered input
     *    tags: [product]
     *    parameters:
     *      - in: path
     *        name: search
     *        required: true
     *        schema:
     *        type: string
     *        description: If nothing is entered, return No product matched your query
     *    responses:
     *      200:
     *        description: Returns the products containing the entered input, you can enter whatever you want, it's in the property results
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/product'
     *      404:
     *        description: No product matched your query
     */
    router.get("/api/search", async (req, res) => {
        const { search } = req.query;
        if (search === "") {
            return res.status(200).json({
                statusText: "Ningun producto matcheo con tu busqueda",
            });
        }
        let products = await productsService.search(search);
        if (products.results.length < 1) {
            return res.status(200).json({
                statusText: "Ningun producto matcheo con tu busqueda",
            });
        }
        return res.json(products);
    });

    router.get("*", (req, res) => {
        return res.status(404).json({
            statusText: "La página que buscas ya no se encuentra disponible",
        });
    });
}

module.exports = products;
