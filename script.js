const elementoProjetos = document.querySelector('#elemento-projetos');
const listaProjetos = [
    { id: 1, titulo: 'Projeto Base' },
    { id: 2, titulo: 'Número Secreto' },
    { id: 3, titulo: 'Sorteador de Números' },
    { id: 4, titulo: 'Aluguel de Jogos' },
    { id: 5, titulo: 'Carrinho de Compras' },
    { id: 6, titulo: 'Compra de Ingressos' },
    { id: 7, titulo: 'Amigo Secreto' }
];

function exibirProjetosNaTela() {
    listaProjetos.forEach((projeto) => {
        elementoProjetos.innerHTML += `
            <div class="projeto modelo__vertical modelo__centralizado">
                <div class="conteudo__caixa modelo__cor-azul">
                    ${retornarSiglaProjeto(projeto.titulo)}
                </div>
                <p class="conteudo__texto">${projeto.titulo}</p>
                <span class="conteudo__tag modelo__cor-verde">
                    ${retornarTag(projeto.titulo)}
                </span>
                <a href="${retornarTag(projeto.titulo)}" target="_blank" class="conteudo__botao modelo__cor-azul">Visualizar</a>
            </div>
        `;
    }); 
}

function removerPreposicaoTitulo(titulo) {
    let listaTitulo = titulo.split(' ');

    if (listaTitulo.includes('de')) {
        const index = listaTitulo.indexOf('de');
        listaTitulo.splice(1, index);
    }

    return listaTitulo;
} 

function retornarTag(titulo) {
    let listaTitulo = removerPreposicaoTitulo(titulo);

    return listaTitulo.join('-')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function retornarSiglaProjeto(titulo) {
    let listaTitulo = removerPreposicaoTitulo(titulo);

    return listaTitulo[0][0] + "" + listaTitulo[1][0];
}

exibirProjetosNaTela();