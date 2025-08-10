const elementoProjetos = document.querySelector('#elemento-projetos');
const listaProjetos = [
    { id: 1, titulo: 'Projeto Base' },
    { id: 2, titulo: 'Número Secreto' },
    { id: 3, titulo: 'Sorteador de Números' },
    { id: 4, titulo: 'Aluguel de Jogos' },
    { id: 5, titulo: 'Carrinho de Compras' }
];

function exibirProjetosNaTela() {
    listaProjetos.forEach((projeto) => {
        elementoProjetos.innerHTML += `
            <div class="projeto modelo__vertical modelo__centralizado">
                <h2 class="conteudo__subtitulo">
                    ${encurtarTitulo(projeto.titulo)}
                </h2>
                <span class="conteudo__tag modelo__cor-verde">
                    ${exibirTagTitulo(projeto.titulo)}
                </span>
                <a href="${exibirTagTitulo(projeto.titulo)}" target="_blank" class="conteudo__botao modelo__cor-azul">Acessar</a>
            </div>
        `;
    });
}

function exibirTagTitulo(titulo) {
    if (titulo.includes('de')) {
        titulo = titulo.replace('de', '');
    }

    titulo = titulo.replace(/\s+/g, '-').toLowerCase();
    titulo = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return titulo;
}

function encurtarTitulo(titulo) {
    let limiteFinal = 12;
    let stringEncurtar = titulo.substring(0, limiteFinal);

    if (titulo.length > 12) {
        titulo = stringEncurtar.concat('...');
    } else {
        titulo = stringEncurtar;
    }

    return titulo;
}

exibirProjetosNaTela();