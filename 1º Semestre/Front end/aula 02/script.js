   const modalCliente = document.getElementById("modalCliente");
   var clientes =  JSON.parse(localStorage.getItem("clientes"))||[];

   document.addEventListener("DOMContentLoaded",renderizarTabela);

   function salvarDadosLocalmente(){
      localStorage.setItem("clientes", JSON.stringify(clientes));
   }

   function abrirModal(){
      document.getElementById("modal").style.display="block";
   }

   function fecharModal(){
      document.getElementById("modal").style.display="none";
      limparCampos();
   }

   const cadCli = document.getElementById("cadCli");
   cadCli.addEventListener("submit", f => {
      f.preventDefault();
      const obj = {
      
      cpf : cadCli.cpf.value,
      nome : cadCli.nome.value,
      sobrenome : cadCli.sobrenome.value,
      nascimento : cadCli.nascimento.value
   }

      //Adicionar os campos na lista clientes
      clientes.push(obj);
      renderizarTabela();
      fecharModal();
      cadCli.reset();
      
   });

   function renderizarTabela(){
      const dados = document.getElementById("dados");
      dados.innerHTML = ""; //limpa todas as linhas da tabela
      //Percorrer a lista preenchendo a tabela novamente
      clientes.forEach((c, i) =>{
      dados.innerHTML += `
      <tr> 
         <td>${c.cpf}</td>
         <td>${c.nome}</td>
         <td>${c.sobrenome}</td>
         <td>${c.nascimento}</td>
         <td><button onclick= "excluir(${i})">Excluir</button></td>
      </tr>
      `;

      });
   }

   function excluir(indice){
   clientes.splice(indice, 1);
   salvarDadosLocalmente();
   window.location.reload();
   }
