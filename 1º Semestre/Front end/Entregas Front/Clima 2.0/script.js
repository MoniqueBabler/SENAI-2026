const key = "6e2f8e0443cdb621d8d248c5e78f7b56";

function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".tempo").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src =
        "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";

    criarCard(dados);
}

function criarCard(dados) {
    const container = document.querySelector(".cards-container");

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h4>${dados.name}</h4>
        <p>${Math.floor(dados.main.temp)}ºC</p>
        <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}.png">
        <p>${dados.weather[0].description}</p>
        <p>Umidade: ${dados.main.humidity}%</p>
    `;

    container.appendChild(card);
}

function limparHistorico() {
    document.querySelector(".cards-container").innerHTML = "";
}

async function buscarCidade(cidade) {
    const dados = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    ).then(resposta => resposta.json());

    colocarDadosNaTela(dados);
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}