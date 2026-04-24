const url = 'http://localhost:3000/tenis';

let tenis = [];
let tenisAtual = null;

const tenisFixos = [
    {
        nome: "Nike Air Max",
        categoria: "casual",
        imagem: "https://cdnv2.moovin.com.br/awallon/imagens/produtos/det/tenis-feminino-nike-air-max-excee-a7cd81d13073f33e439a0d7e49e0feb2.jpg",
        marca: "Nike",
        genero: "unisex",
        preco: 699.90
    },
    {
        nome: "Adidas Campus",
        categoria: "casual",
        imagem: "https://lojabeefancy.com.br/cdn/shop/files/tenis-adidas-campus-794830.jpg",
        marca: "Adidas",
        genero: "unisex",
        preco: 799.90
    },
    {
        nome: "Puma RS-X",
        categoria: "casual",
        imagem: "https://authenticfeet.vtexassets.com/arquivos/ids/480905/37100-8-029-3-AF-800x1000.jpg",
        marca: "Puma",
        genero: "unisex",
        preco: 599.90
    },
    {
        nome: "Converse Chuck Taylor",
        categoria: "casual",
        imagem: "https://converse.com.br/media/catalog/product/m/9/m9160c_a_107x1_1.png",
        marca: "Converse",
        genero: "unisex",
        preco: 349.90
    },
    {
        nome: "Vans Old Skool",
        categoria: "skate",
        imagem: "https://secure-static.vans.com.br/medias/sys_master/vans/vans/h2b/ha3/h00/h00/12859397177374/Midres-Vans-V1002002760001-02.jpg",
        marca: "Vans",
        genero: "unisex",
        preco: 399.90
    },
    {
        nome: "Adidas Grand Court",
        categoria: "casual",
        imagem: "https://martimx.vtexassets.com/arquivos/ids/1694150-800-800",
        marca: "Adidas",
        genero: "unisex",
        preco: 219.90
    },
    {
        nome: "New Balance 574",
        categoria: "casual",
        imagem: "https://m.media-amazon.com/images/I/31d+f1HWfEL._AC_SY900_.jpg",
        marca: "New Balance",
        genero: "unisex",
        preco: 499.90
    },
    {
        nome: "Nike Initiator",
        categoria: "corrida",
        imagem: "https://images.tcdn.com.br/img/img_prod/1393241/tenis_nike_initiator_851_1.jpeg",
        marca: "Nike",
        genero: "unisex",
        preco: 300.90
    },
    {
        nome: "Reebok Classic",
        categoria: "casual",
        imagem: "https://reebokbr.vteximg.com.br/arquivos/ids/168431/GY7231_SLC_eCom.jpg",
        marca: "Reebok",
        genero: "unisex",
        preco: 379.90
    },
    {
        nome: "Under Armour HOVR",
        categoria: "treino",
        imagem: "https://underarmourbr.vtexassets.com/arquivos/ids/213750-800-800",
        marca: "Under Armour",
        genero: "unisex",
        preco: 649.90
    }
];



const nomeInput = document.getElementById("nome");
const tipoInput = document.getElementById("tipo");
const imagemInput = document.getElementById("imagem");
const marcaInput = document.getElementById("marca");
const generoInput = document.getElementById("genero");
const precoInput = document.getElementById("preco");


const tituloReceita = document.getElementById("tituloReceita");
const imgReceita = document.getElementById("imgReceita");
const nomeEdit = document.getElementById("nomeEdit");
const imgEdit = document.getElementById("imgEdit");
const tipoEdit = document.getElementById("tipoEdit");
const marcaEdit = document.getElementById("marcaEdit");
const colecaoEdit = document.getElementById("colecaoEdit");
const custoEdit = document.getElementById("custoEdit");

const detalhes = document.getElementById("detalhes");
const cadastro = document.getElementById("cadastro");

carregarTenis();

function carregarTenis() {
    fetch(url + '/listar')
        .then(res => res.json())
        .then(data => {
            tenis = [...tenisFixos, ...data]; 
            listarCards();
        })
        .catch(() => {
            tenis = tenisFixos; 
            listarCards();
        });
}

function listarCards() {
    const container = document.getElementById("cards");
    container.innerHTML = '';

    tenis.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('box');

        card.innerHTML = `
            <img src="${item.imagem}">
            <div class="info">
                <p>${item.nome}</p>
                <p>R$ ${item.preco}</p>
                <button>Ver</button>
            </div>
        `;

        card.querySelector('button').onclick = () => abrirTenis(item);
        container.appendChild(card);
    });
}

function abrirTenis(item) {
    tenisAtual = item;

    tituloReceita.innerText = item.nome;
    imgReceita.src = item.imagem;

    nomeEdit.value = item.nome;
    imgEdit.value = item.imagem;
    tipoEdit.value = item.categoria;
    marcaEdit.value = item.marca;
    colecaoEdit.value = item.colecao || '';
    custoEdit.value = item.preco;

    detalhes.classList.remove('oculto');
}

imgEdit.addEventListener("input", () => {
    imgReceita.src = imgEdit.value;
});

document.getElementById("formCad").addEventListener("submit", e => {
    e.preventDefault();

    const novoTenis = {
        nome: nomeInput.value,
        categoria: tipoInput.value,
        imagem: imagemInput.value,
        marca: marcaInput.value,
        genero: generoInput.value,
        preco: Number(precoInput.value)
    };

    fetch(url + '/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoTenis)
    })
        .then(() => {
            alert("Cadastrado!");
            cadastro.classList.add('oculto');
            carregarTenis();
        })
        .catch(() => alert("Erro ao cadastrar"));
});

function salvarEdicao() {
    const dados = {
        nome: nomeEdit.value,
        categoria: tipoEdit.value,
        imagem: imgEdit.value,
        marca: marcaEdit.value,
        colecao: colecaoEdit.value,
        preco: Number(custoEdit.value)
    };

    fetch(url + '/atualizar/' + tenisAtual.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(() => {
            alert("Atualizado!");
            detalhes.classList.add('oculto');
            carregarTenis();
        })
        .catch(() => alert("Erro ao atualizar"));
}

function excluirTenisAtual() {
    if (!confirm("Excluir?")) return;

    fetch(url + '/excluir/' + tenisAtual.id, {
        method: 'DELETE'
    })
        .then(() => {
            alert("Excluído!");
            detalhes.classList.add('oculto');
            carregarTenis();
        })
        .catch(() => alert("Erro ao excluir"));
}