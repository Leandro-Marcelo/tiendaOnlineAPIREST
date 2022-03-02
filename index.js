const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || config.port;

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("Hola, bienvenido a mi API-REST de Tienda Online");
});

app.listen(PORT, () => {
  console.log("Servidor: http://localhost:4000");
});
