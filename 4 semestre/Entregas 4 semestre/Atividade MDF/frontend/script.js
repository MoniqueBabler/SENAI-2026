const apiUrl = "http://localhost:3000";
const $ = id => document.getElementById(id);

const listaProdutos = $("listaProdutos");
const formProduto = $("formCad");
const cadastro = $("cadastro");
const buscaProduto = $("buscaProduto");
const usuarioLogado = $("usuarioLogado");

let produtoEditando = null;

async function carregarProdutos() {
  if (!listaProdutos) return;

  const produtos = await (await fetch(`${apiUrl}/produto/listar`)).json();

  listaProdutos.innerHTML = produtos.map(p => `
    <tr>
      <td>${p.nome}</td>
      <td>${p.descricao || ""}</td>
      <td>R$ ${Number(p.custo || 0).toFixed(2)}</td>
      <td>${p.quantidade_estoque} ${
        p.quantidade_estoque < p.estoque_minimo
          ? '<b style="color:red">⚠ Estoque baixo!</b>'
          : ""
      }</td>
      <td>${p.estoque_minimo}</td>
      <td>
        <button onclick="editarProduto(${p.id_produto})">Editar</button>
        <button onclick="excluirProduto(${p.id_produto})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

async function excluirProduto(id) {
  await fetch(`${apiUrl}/produto/excluir/${id}`, { method: "DELETE" });
  carregarProdutos();
}

async function editarProduto(id) {
  const p = await (await fetch(`${apiUrl}/produto/buscar/${id}`)).json();

  $("nome").value = p.nome;
  $("descricao").value = p.descricao;
  $("custo").value = p.custo;
  $("quantidade").value = p.quantidade_estoque;
  $("estoqueMinimo").value = p.estoque_minimo;

  produtoEditando = id;
  cadastro.classList.remove("oculto");
}

if (formProduto) {
  formProduto.addEventListener("submit", async e => {
    e.preventDefault();

    const produto = {
      nome: $("nome").value,
      descricao: $("descricao").value,
      custo: parseFloat($("custo").value),
      quantidade_estoque: parseInt($("quantidade").value),
      estoque_minimo: parseInt($("estoqueMinimo").value)
    };

    const url = produtoEditando
      ? `${apiUrl}/produto/atualizar/${produtoEditando}`
      : `${apiUrl}/produto/cadastrar`;

    await fetch(url, {
      method: produtoEditando ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    cadastro.classList.add("oculto");
    produtoEditando = null;
    formProduto.reset();
    carregarProdutos();
  });
}

if (buscaProduto) {
  buscaProduto.addEventListener("input", async () => {
    const termo = buscaProduto.value.toLowerCase();
    const produtos = await (await fetch(`${apiUrl}/produto/listar`)).json();

    listaProdutos.innerHTML = produtos
      .filter(p => p.nome.toLowerCase().includes(termo))
      .map(p => `
        <tr>
          <td>${p.nome}</td>
          <td>${p.descricao || ""}</td>
          <td>R$ ${Number(p.custo || 0).toFixed(2)}</td>
          <td>${p.quantidade_estoque}</td>
          <td>${p.estoque_minimo}</td>
          <td>
            <button onclick="editarProduto(${p.id_produto})">Editar</button>
            <button onclick="excluirProduto(${p.id_produto})">Excluir</button>
          </td>
        </tr>
      `).join("");
  });
}

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

const formProducao = $("formProducao");
const listaProducao = $("listaProducao");
const produtoSelect = $("produtoSelect");
const buscaProducao = $("buscaProducao");

async function carregarProducao() {
  if (!listaProducao) return;

  const producoes = await (await fetch(`${apiUrl}/producao/listar`)).json();

  listaProducao.innerHTML = producoes.map(p => `
    <tr>
      <td>${p.id_producao}</td>
      <td>${p.produto?.nome || p.id_produto}</td>
      <td>${p.tipo}</td>
      <td>${p.quantidade}</td>
      <td>${new Date(p.data_producao).toLocaleDateString()}</td>
    </tr>
  `).join("");
}

async function carregarProdutosSelect() {
  if (!produtoSelect) return;

  const produtos = await (await fetch(`${apiUrl}/produto/listar`)).json();

  produtoSelect.innerHTML = produtos
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(p => `<option value="${p.id_produto}">${p.nome}</option>`)
    .join("");
}

if (buscaProducao) {
  buscaProducao.addEventListener("input", async () => {
    const termo = buscaProducao.value.toLowerCase();
    const producoes = await (await fetch(`${apiUrl}/producao/listar`)).json();

    listaProducao.innerHTML = producoes
      .filter(p => (p.produto?.nome || "").toLowerCase().includes(termo))
      .map(p => `
        <tr>
          <td>${p.id_producao}</td>
          <td>${p.produto?.nome || p.id_produto}</td>
          <td>${p.tipo}</td>
          <td>${p.quantidade}</td>
          <td>${new Date(p.data_producao).toLocaleDateString()}</td>
        </tr>
      `).join("");
  });
}

if (formProducao) {
  formProducao.addEventListener("submit", async e => {
    e.preventDefault();

    const producao = {
      id_produto: Number(produtoSelect.value),
      tipo: $("tipo").value,
      quantidade: parseInt($("quantidadeProd").value),
      id_usuario: 1
    };

    const res = await fetch(`${apiUrl}/producao/cadastrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producao)
    });

    if (res.ok) {
      alert("Produção registrada com sucesso!");
      carregarProducao();
      carregarProdutosSelect();
      carregarProdutos();
    } else {
      const erro = await res.json();
      alert("Erro: " + erro.erro);
    }
  });
}

const formLogin = $("formLogin");
const mensagemErro = $("mensagemErro");

if (formLogin) {
  formLogin.addEventListener("submit", async e => {
    e.preventDefault();

    const res = await fetch(`${apiUrl}/usuario/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: $("email").value,
        senha: $("senha").value
      })
    });

    if (res.ok) {
      localStorage.setItem("usuario", JSON.stringify(await res.json()));
      window.location.href = "index.html";
    } else {
      const erro = await res.json();
      mensagemErro.textContent = erro.erro || "Falha na autenticação";
      mensagemErro.classList.remove("oculto");
    }
  });
}

const listaHistorico = $("listaHistorico");

async function carregarHistorico() {
  if (!listaHistorico) return;

  const producoes = await (await fetch(`${apiUrl}/producao/listar`)).json();

  listaHistorico.innerHTML = producoes.map(p => `
    <tr>
      <td>${p.usuario?.nome || p.id_usuario}</td>
      <td>${p.tipo === "pedido" ? "Pedido" : "Produção"}</td>
      <td>${p.produto?.nome || p.id_produto}</td>
      <td>${p.quantidade}</td>
      <td>${new Date(p.data_producao).toLocaleString()}</td>
    </tr>
  `).join("");
}

window.onload = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario && usuarioLogado)
    usuarioLogado.textContent = "Logado como: " + usuario.nome;

  carregarProdutos();
  carregarProdutosSelect();
  carregarProducao();
  carregarHistorico();
};