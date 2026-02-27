require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* Importar e Implementar Rotas */
const carrosRotas = require("./src/routes/carros.routes");
 app.use("/carros", carrosRotas);
/* Fim */

/* Importar e Implementar Rotas */
const clientesRotas = require("./src/routes/clientes.routes");
 app.use("/clientes", clientesRotas);
/* Fim */

const porta = process.env.PORT_APP || 3000;

app.listen(porta, () => {
    console.log(`Online na porta ${porta}`);
});