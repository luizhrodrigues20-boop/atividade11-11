
let moradores = JSON.parse(
    localStorage.getItem("moradores")
) || [];

const formulario = document.getElementById("formMorador");
const lista = document.getElementById("listaMoradores");

function salvar() {
    localStorage.setItem("moradores", JSON.stringify(moradores));
}

function mostrarMoradores() {
    lista.innerHTML = "";

    moradores.forEach((morador, index) => {
        const item = document.createElement("li");

        const texto = document.createElement("p");
        texto.textContent =
            `Nome: ${morador.nome} | Telefone: ${morador.telefone} | Endereço: ${morador.endereco}`;

        const editar = document.createElement("button");
        editar.textContent = "Editar";

        editar.onclick = function() {
            const nome = prompt("Novo nome:", morador.nome);

            if (nome && nome.trim() !== "") {
                moradores[index].nome = nome.trim();
                salvar();
                mostrarMoradores();
            }
        };

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.onclick = function() {
            moradores.splice(index, 1);
            salvar();
            mostrarMoradores();
        };

        item.appendChild(texto);
        item.appendChild(editar);
        item.appendChild(excluir);

        lista.appendChild(item);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const morador = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value
    };

    moradores.push(morador);

    salvar();
    mostrarMoradores();
    formulario.reset();
});

mostrarMoradores();
