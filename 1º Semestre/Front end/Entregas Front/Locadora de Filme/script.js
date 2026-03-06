var filmes = JSON.parse(localStorage.getItem("filmes")) || [];

document.addEventListener("DOMContentLoaded", renderizarTabela);

function salvarDadosLocalmente() {
    localStorage.setItem("filmes", JSON.stringify(filmes));
}

function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    limparCampos();
}

function limparCampos() {
    document.getElementById("cadFilme").reset();
}

const cadFilme = document.getElementById("cadFilme");
cadFilme.addEventListener("submit", f => {
    f.preventDefault();
    const obj = {
        capa: cadFilme.capa.value,
        nome: cadFilme.nome.value,
        genero: cadFilme.genero.value,
        ano: cadFilme.ano.value,
        classificacao: cadFilme.classificacao.value,
        produtora: cadFilme.produtora.value
    };

    filmes.push(obj);
    salvarDadosLocalmente();
    renderizarTabela();
    fecharModal();
});

function renderizarTabela(filtroGenero = "") {
    const dados = document.getElementById("dados");
    dados.innerHTML = "";

    filmes.forEach((f, i) => {
        if (filtroGenero === "" || f.genero === filtroGenero) {
            dados.innerHTML += `
            <tr>
                <td><img src="${f.capa}" alt="Capa" width="60"></td>
                <td>${f.nome}</td>
                <td>${f.genero}</td>
                <td>${f.ano}</td>
                <td>${f.classificacao}</td>
                <td>${f.produtora}</td>
                <td><button onclick="excluir(${i})">Excluir</button></td>
            </tr>
            `;
        }
    });
}

function excluir(indice) {
    filmes.splice(indice, 1);
    salvarDadosLocalmente();
    renderizarTabela();
}

function filtrarPorGenero() {
    const genero = document.getElementById("filtroGenero").value;
    renderizarTabela(genero);
}