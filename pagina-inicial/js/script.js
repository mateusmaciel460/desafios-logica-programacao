const elementoProjetos = document.querySelector('#elementos-projetos');
const listaProjetos = [
    { id: 1, titulo: "Projeto Base" }
];

function exibirProjetosNaTela() {
    listaProjetos.forEach((projeto) => {
        elementoProjetos.innerHTML += `
            <a href="${retornarTagProjeto(projeto.titulo)}/index.html" target="_blank" class="conteudo__botao modelo__cor-azul" id="projeto-${projeto.id}">
                ${projeto.titulo}
            </a>
        `;
    });
}

function retornarTagProjeto(texto) {
    return texto.toLowerCase().replace(" ", "-");
}

exibirProjetosNaTela();