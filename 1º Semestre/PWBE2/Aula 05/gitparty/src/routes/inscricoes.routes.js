const express = require("express");

const router = express.Router();

const {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
  cancelar,
  encerrar,
} = require("../controllers/inscricoes.controller");

router.post("/cadastrar", cadastrar);
router.get("/listar", listar);
router.get("/buscar/:id", buscar);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);
router.put("/cancelar/:id", cancelar);
router.put("/encerrar/:id", encerrar);

module.exports = router;