const prisma = require("../data/prisma");

// CADASTRAR
const cadastrar = async (req, res) => {
  console.log("CHEGOU AQUI", req.body);

  const item = await prisma.produto.create({
    data: req.body,
  });

  res.status(201).json(item);
};

// LISTAR
const listar = async (req, res) => {
  try {
    const lista = await prisma.produto.findMany();
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// BUSCAR
const buscar = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// ATUALIZAR
const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const item = await prisma.produto.update({
      where: { id: Number(id) },
      data: dados,
    });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// EXCLUIR
const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.produto.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
};