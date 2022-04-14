const express = require("express");
const cors = require("cors");
const config = require("./config");
const products = require("./routes/products");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tienda Online APIREST",
            version: "1.0.0",
            /* los servidores no son requeridos pero se lo tenemos que pasar para decirle donde va a estar funcionando nuetra API, por default va a tomar el servidor actual */
        },
        servers: [
            {
                /* aquí iría la url donde va a estar nuestra documentación */
                url: "https://apitiendaonline.rj.r.appspot.com",
            },
        ],
    },
    /* debo indicarle donde van a estar las routes o los endpoints que nosotros queremos documentar*/
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

// settings
const app = express();

// middlewares
app.use(express.json());
app.use(express.text());
/* creo que este static frontend */
/* app.use(express.static("frontend")); */
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        /* acá ponemos 3000 para que pueda ingresar desde react */
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:5500",
            "https://leandro-marcelo.github.io/tienda-online-react/",
            "https://leandro-marcelo.github.io",
        ],
        credentials: true,
    })
);
/* esta ruta me va a mostrar la documentación, usando el objeto swaggerUI voy a servir, luego usando el mismo objeto voy a establecer la configuración inicial, pero esa configuración inicial la va a retornar este método swaggerJsDoc() la cual recibe la configuración inicial la cual va a configurar todo el swaggerJsDoc, lo retorna y se lo pasa a este método setup. Esa configuración inicial es un objeto */
app.use(
    "/api-doc",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

products(app);

// routes
app.get("/", (req, res) => {
    res.status(200).send(
        "Hola, soy Leandro Marcelo, bienvenido a mi API REST de Tienda Online"
    );
});

app.get("*", (req, res) => {
    res.status(404).json({ statusText: "Página no encontrada" });
});

// server listening
app.listen(config.port, () => {
    console.log("Servidor: http://localhost:" + config.port);
});
