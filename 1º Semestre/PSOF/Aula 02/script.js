const url = 'https://receitasapi-b-2025.vercel.app';
const receitas = [];

carregarReceitas();

function carregarReceitas(){
    fetch(url + '/receitas')
    .then(response => responde.json())
    .then(data =>{
        receitas.length = 0;
        receitas.push(...data);
        listaCards();
    })
    .catch(e => alert('Problemas com a conexão da API'));
}

function lista(){
    const container = document.querySelector('main');
    container.innerHTML = '';

    receitas.forEach(receita => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h3>${receita.nome}</h3>
        <img src="${receita.img}"alt="${receita.nome}">
        <p>Custo Aproximado: ${receita.custoAproximado}</p>
        `;

        container.appendChild(card);
    })
}


























// const api = "https://receitasapi-b-2025.vercel.app/receitas";

// let receitaEditando = null;

// async function buscarReceitas() {
//     const dados = await fetch(api).then(res => res.json());

//     const lista = document.getElementById("lista-receitas");
//     lista.innerHTML = "";

//     dados.forEach(receita => {
//         lista.innerHTML += `
//             <div class="card">
//                 <img src="${receita.img}">
//                 <h3>${receita.nome}</h3>
//                 <p>${receita.tipo}</p>
//                 <p>${receita.custoAproximado}</p>

//                 <button onclick="editar(${receita.id})">Editar</button>
//                 <button onclick="deletar(${receita.id})">Excluir</button>
//             </div>
//         `;
//     });
// }

// function abrirModal() {
//     document.getElementById("modal").style.display = "block";
// }

// function fecharModal() {
//     document.getElementById("modal").style.display = "none";
//     receitaEditando = null;
// }

// async function salvarReceita() {

//     const receita = {
//         nome: document.getElementById("nome").value,
//         tipo: document.getElementById("tipo").value,
//         ingredientes: document.getElementById("ingredientes").value,
//         modoFazer: document.getElementById("modoFazer").value,
//         img: document.getElementById("img").value,
//         custoAproximado: parseFloat(document.getElementById("custo").value)
//     };

//     if (receitaEditando) {
//         await fetch(`${api}/${receitaEditando}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(receita)
//         });
//     } else {
//         await fetch(api, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(receita)
//         });
//     }

//     fecharModal();
//     buscarReceitas();
// }

// async function editar(id) {
//     const dados = await fetch(`${api}/${id}`).then(res => res.json());

//     document.getElementById("nome").value = dados.nome;
//     document.getElementById("tipo").value = dados.tipo;
//     document.getElementById("ingredientes").value = dados.ingredientes;
//     document.getElementById("modoFazer").value = dados.modoFazer;
//     document.getElementById("img").value = dados.img;
//     document.getElementById("custo").value = dados.custoAproximado;

//     receitaEditando = id;
//     abrirModal();
// }

// async function deletar(id) {
//     await fetch(`${api}/${id}`, {
//         method: "DELETE"
//     });

//     buscarReceitas();
// }

// buscarReceitas();