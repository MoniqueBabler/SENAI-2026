const prisma = require("../data/prisma");
const { limiteInscricoes, inscricaoDuplicada, prazoCancelamento, promoverListaEspera, verificarExcluirEvento, encerrarEvento } = require("../services/inscricoes.services");

const cadastrar = async (req, res) => {
  try {
    const data = req.body;

    await inscricaoDuplicada(data.usuariosId, data.eventosId);

    const status = await limiteInscricoes(data.eventosId);

    if (status != "") data.status = status;

    const item = await prisma.Inscricoes.create({
      data,
    });

    res.json(item).status(201).end();
  } catch (error) {
   res.status(500).json(error.toString()).end();    
  }
};

const listar = async (req, res) => {
  const lista = await prisma.Inscricoes.findMany();

  res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.Inscricoes.findUnique({
    where: { id: Number(id) },
  });

  res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const item = await prisma.Inscricoes.update({
    where: { id: Number(id) },
    data: dados,
  });

  res.json(item).status(200).end();
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    await verificarExcluirEvento(Number(id));

    const evento = await prisma.Eventos.delete({
      where: { id: Number(id) },
    });

    res.json(evento).status(200).end();
  } catch (error) {
    res.status(500).json(error.toString()).end();
  }
};

const cancelar = async (req, res) => {
  try {
    const { id } = req.params;

    const inscricao = await prazoCancelamento(Number(id));

    const item = await prisma.Inscricoes.update({
      where: { id: Number(id) },
      data: { status: "CANCELADA" }
    });

    if (inscricao.status === "CONFIRMADA") {
      await promoverListaEspera(inscricao.eventosId);
    }

    res.json(item).status(200).end();
  } catch (error) {
    res.status(500).json(error.toString()).end();
  }
};

const encerrar = async (req, res) => {
  try {
    const { id } = req.params;

    await encerrarEvento(Number(id));

    res.json({ message: "Evento encerrado!" }).status(200).end();
  } catch (error) {
    res.status(500).json(error.toString()).end();
  }
};

module.exports = {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
  cancelar,
  encerrar
};