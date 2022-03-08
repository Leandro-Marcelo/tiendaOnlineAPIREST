const express = require("express");

const cors = require("cors");
const config = require("./config");

const products = require("./routes/products");

const app = express();

app.use(express.json());
app.use(express.text());
/* creo que este static frontend */
app.use(express.static("frontend"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

products(app);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Hola, soy Leandro Marcelo, bienvenido a mi API REST de Tienda Online"
    );
});

app.get("*", (req, res) => {
  res.status(404).json({ statusText: "Página no encontrada" });
});

app.listen(config.port, () => {
  console.log("Servidor: http://localhost:" + config.port);
});
