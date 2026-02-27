const prisma = require('../data/prisma.js');

async function cadastrarCarro(req, res) {
    let { modelo, marca, placa, ano } = req.body;

    if (!placa || !marca || !modelo || !ano) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios!" });
    }

    placa = placa.trim().toUpperCase().replace(" ", "");

    if (!placa) {
        return res.status(400).json({ erro: "A placa não pode estar vazia!" });
    }

    if (placa.length !== 7) {
        return res.status(400).json({ erro: "A placa deve conter exatamente 7 caracteres!" });
    }

    if (placa.includes(" ")) {
        return res.status(400).json({ erro: "A placa não pode conter espaços!" });
    }
    
    marca = marca.trim();

    if (marca[0] !== marca[0].toUpperCase()) {
        return res.status(400).json({ erro: "A marca deve começar com letra maiúscula!" });
    }

    modelo = modelo.trim();

    if (modelo[0] !== modelo[0].toUpperCase()) {
        return res.status(400).json({ erro: "O modelo deve começar com a letra maiúscula!" });
    }
     
    if (ano.length !== 4) {
        return res.status(400).json({ erro: "O ano deve conter exatamente 4 dígitos!" });
    }

    if (ano.split("").some(c => c < "0" || c > "9")) {
        return res.status(400).json({ erro: "O ano não pode conter letras!" });
    }

    const carroExistente = await prisma.carro.findUnique({
        where: { placa }
    });

    if (carroExistente) {
        return res.status(400).json({ erro: "Já existe um carro com essa mesma placa!" });
    }

    const novoCarro = await prisma.carro.create({
        data: {
            placa,
            marca,
            modelo,
            ano: Number(ano)
        }
    });

    return res.status(201).json({
        mensagem: "Carro cadastrado com sucesso.",
        carro: novoCarro
    });
}

async function listarCarros(req, res) {
    const carros = await prisma.carro.findMany();
    return res.status(200).json(carros);
}

async function buscarCarro(req, res) {
    const { id } = req.params;

    const carro = await prisma.carro.findUnique({
        where: { id: Number(id) }
    });

    if (!carro) {
        return res.status(404).json({ erro: "Carro não encontrado." });
    }

    return res.status(200).json(carro);
}

async function atualizarCarro(req, res) {
    const { id } = req.params;

    const carroExistente = await prisma.carro.findUnique({
        where: { id: Number(id) }
    });

    if (!carroExistente) {
        return res.status(404).json({ erro: "Carro não encontrado." });
    }

    const carroAtualizado = await prisma.carro.update({
        where: { id: Number(id) },
        data: req.body
    });

    return res.status(200).json(carroAtualizado);
}

async function deletarCarro(req, res) {
    const { id } = req.params;

    const carroExistente = await prisma.carro.findUnique({
        where: { id: Number(id) }
    });

    if (!carroExistente) {
        return res.status(404).json({ erro: "Carro não encontrado." });
    }

    await prisma.carro.delete({
        where: { id: Number(id) }
    });

    return res.status(200).json({ mensagem: "Carro deletado com sucesso." });
}

module.exports = {
    cadastrarCarro,
    listarCarros,
    buscarCarro,
    atualizarCarro,
    deletarCarro
};