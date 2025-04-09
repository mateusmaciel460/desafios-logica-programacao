let elementoMensagemErro = document.querySelector('#elemento-mensagem-erro');
let elementoEntradasDisponiveis = document.querySelector('#elemento-entradas-disponiveis');
let elementoTipo = document.querySelector('#tipo');

let listaEntradasDisponiveis = [
    { titulo: 'Setor superior', quantidade: 0, quantidadeInicial: 0 },
    { titulo: 'Setor central', quantidade: 0, quantidadeInicial: 0 },
    { titulo: 'Setor inferior', quantidade: 0, quantidadeInicial: 0 }
];

function escolher() {
    let quantidade = document.querySelector('#quantidade').value;
    let tipo = document.querySelector('#tipo').value;

    elementoMensagemErro.innerHTML = '';

    // Validação
    if ((quantidade && tipo) == '') {
        exibirMensagemErro('Preencha todos os campos!');
        return;
    }

    if (quantidade <= 0) {
        exibirMensagemErro(`A quantidade deve ser um número maior que 0, e não [${quantidade}]`);
        return;
    }

    document.querySelector('#quantidade').value = '';

    elementoEntradasDisponiveis.innerHTML = '';
    listaEntradasDisponiveis.forEach((entrada) => {
        if (entrada.titulo == tipo) {
            let palavraCadeira = quantidade > 1 ? 'cadeiras disponíveis' : 'cadeira disponível';

            if (quantidade > entrada.quantidade) {
                exibirMensagemErro(`Não temos ${quantidade} ${palavraCadeira}, disponibilidade: ${entrada.quantidade}.`);
            } else {
                entrada.quantidade -= quantidade;
            }
        }

        elementoEntradasDisponiveis.innerHTML += `
            <li class="conteudo__bloco">
                ${entrada.titulo}:
                <span class="conteudo__destaque">${entrada.quantidade}</span>
            </li>
        `;
    });

    let somaGeralEntradas = somaListaEntrada();

    if (somaGeralEntradas[0] == 0) {
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    }
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    document.querySelector('#quantidade').value = '';
    elementoEntradasDisponiveis.innerHTML = '';
    elementoMensagemErro.innerHTML = '';
    exibirEntradasInicial();
}

function exibirTiposNaTela() {
    listaEntradasDisponiveis.forEach((entrada) => {
        elementoTipo.innerHTML += `
            <option value="${entrada.titulo}">${entrada.titulo}</option>`;
    });
}

function adicionarEntradasIniciais() {
    listaEntradasDisponiveis.forEach((entrada) => {
        entrada.quantidade = 100;
        entrada.quantidadeInicial = 100;
    });
}

function exibirEntradasInicial() {
    adicionarEntradasIniciais();

    listaEntradasDisponiveis.forEach((entrada) => {
        elementoEntradasDisponiveis.innerHTML += `
            <li class="conteudo__bloco">
                ${entrada.titulo}:
                <span class="conteudo__destaque">${entrada.quantidade}</span>
            </li>`;
    });
}

function somaListaEntrada() {
    let somaQuantidade = 0;
    let somaQuantidadeInicial = 0;
    let listaEntradasSomadas = [];

    listaEntradasDisponiveis.forEach((entrada) => {
        somaQuantidade += entrada.quantidade;
        somaQuantidadeInicial += entrada.quantidadeInicial;
    });

    listaEntradasSomadas.push(somaQuantidade, somaQuantidadeInicial);

    return listaEntradasSomadas;
}

function exibirMensagemErro(conteudo) {
    elementoMensagemErro.innerHTML += `
        <span class="conteudo__mensagem--alerta">${conteudo}</span>
    `;
}

exibirEntradasInicial();
exibirTiposNaTela();