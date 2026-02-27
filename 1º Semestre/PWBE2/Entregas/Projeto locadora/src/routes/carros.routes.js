
const express = require("express");

const router = express.Router();

const carrosController = require("../controller/carros.controller.js");

router.post("/cadastrar", carrosController.cadastrarCarro);
router.get("/listar", carrosController.listarCarros);
router.get("/:id", carrosController.buscarCarro);
router.put("/:id", carrosController.atualizarCarro);
router.delete("/:id", carrosController.deletarCarro);

module.exports = router;

