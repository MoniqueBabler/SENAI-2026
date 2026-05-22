const API = "http://localhost:3000/tarefa";

const key = "6e2f8e0443cdb621d8d248c5e78f7b56";

function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".tempo").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src =
        "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
}

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(res => res.json());
    colocarDadosNaTela(dados);
}

const botao = document.querySelector(".botao-busca");

if (botao) {
    botao.addEventListener("click", () => {
        const cidade = document.querySelector(".input-cidade").value;
        buscarCidade(cidade);
    });
}

const cards = document.getElementById("cards");

if (cards) {
    fetch(`${API}/listar`)
    .then(res => res.json())
    .then(data => {
    data.forEach(t => {
    cards.innerHTML += `
    <div class="card">
    <img src="${t.imagem}" />
    <h3>${t.nome}</h3>
    <p>${new Date(t.inicio).toLocaleDateString()} até ${new Date(t.fim).toLocaleDateString()}</p>

    <button onclick="abrirModal('${t.nome}', '${t.descricao}')">
    Ver mais
    </button>

    <button onclick="deletar(${t.id})">Excluir</button>
    </div>
    `;
    });
    });
}


function abrirModal(nome, descricao) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-titulo").innerText = nome;
    document.getElementById("modal-descricao").innerText = descricao;
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

async function deletar(id) {
    await fetch(`${API}/excluir/${id}`, {
        method: "DELETE"
    });

    location.reload();
}