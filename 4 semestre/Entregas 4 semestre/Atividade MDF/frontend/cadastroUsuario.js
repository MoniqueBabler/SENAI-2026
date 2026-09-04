const apiUrl = "http://localhost:3000";

const formUsuario = document.getElementById("formUsuario");

if (formUsuario) {
  formUsuario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeUsuario").value.trim();
    const email = document.getElementById("emailUsuario").value.trim();
    const senha = document.getElementById("senhaUsuario").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("E-mail inválido.");
      return;
    }

    const usuario = { nome, email, senha };

    try {
      const resposta = await fetch(`${apiUrl}/usuario/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
      });

      if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } else {
        const erro = await resposta.json();
        if (erro.erro === "E-mail já cadastrado") {
          alert("Este e-mail já está em uso. Tente outro.");
        } else {
          alert("Erro ao cadastrar: " + (erro.erro || "Verifique os dados."));
        }
      }
    } catch (err) {
      alert("Falha na comunicação com o servidor.");
      console.error(err);
    }
  });
}