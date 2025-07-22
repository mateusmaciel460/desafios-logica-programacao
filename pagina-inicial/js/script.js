const elementoProjetos = document.querySelector('#elementos-projetos');
const listaProjetos = [
    { id: 1, titulo: "Projeto Base" }, 
    { id: 2, titulo: "Número Secreto" }
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
    return texto.normalize('NFD').
        replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(" ", "-");
}

exibirProjetosNaTela();