let elementoEntradasDisponiveis = document.querySelector('#elemento-entradas-disponiveis');
let mensagemErro = document.querySelector('#mensagem-erro');

let listaEntradasDisponiveis = [
    { id: 1, titulo: 'superior', quantidade: 100, quantidadeInicial: 100 },
    { id: 2, titulo: 'central', quantidade: 90, quantidadeInicial: 90 },
    { id: 3, titulo: 'inferior', quantidade: 80, quantidadeInicial: 80 },
];

function escolher() {
    let quantidade = document.querySelector('#quantidade').value;
    let entrada = document.querySelector('#entrada').value;

    // Validação
    mensagemErro.innerHTML = '';

    if ((quantidade && entrada) == '') {
        exibirMensagemErro('Preencha todos os campos.');
        return;
    }

    if (quantidade <= 0) {
        exibirMensagemErro(`Quantidade deve ser um número maior que 0, e não [${quantidade}]`);
        return;
    }

    document.querySelector('#quantidade').value = '';

    elementoEntradasDisponiveis.innerHTML = '';    
    listaEntradasDisponiveis.forEach((bilhete) => {
        if (bilhete.titulo == entrada) {
            let palavraCadeira = quantidade > 1 ? 'cadeiras disponíveis' : 'cadeira disponível';

            if (quantidade > bilhete.quantidade) {
                exibirMensagemErro(`Não temos ${quantidade} ${palavraCadeira} para ${bilhete.titulo}, apenas ${bilhete.quantidade}.`);
            } else {
                bilhete.quantidade -= quantidade;
            }
            
            if (bilhete.quantidade <= 0) {
                bilhete.quantidade = 0;
            } 
        }

        elementoEntradasDisponiveis.innerHTML += `
            <li class="conteudo__bloco">
                Setor ${bilhete.titulo}: 
                <span class="conteudo__destaque">${bilhete.quantidade}</span>
            </li>
        `;
    });

    let listaQuantidadeAtualizada = listaSomatorioEntradas();

    if (listaQuantidadeAtualizada[0] == 0) {
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    }
}

function reiniciar() {
    listaEntradasDisponiveis = [
        { id: 1, titulo: 'superior', quantidade: 100, quantidadeInicial: 100 },
        { id: 2, titulo: 'central', quantidade: 90, quantidadeInicial: 90 },
        { id: 3, titulo: 'inferior', quantidade: 80, quantidadeInicial: 80 },
    ];  

    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    exibirEntradasDisponiveis();
}

function exibirEntradasDisponiveis() {
    elementoEntradasDisponiveis.innerHTML = '';
    listaEntradasDisponiveis.forEach((bilhete) => {
        elementoEntradasDisponiveis.innerHTML += `
            <li class="conteudo__bloco">
                Setor ${bilhete.titulo}: 
                <span class="conteudo__destaque">${bilhete.quantidade}</span>
            </li>
        `;
    });
}

function exibirMensagemErro(conteudo) {
    mensagemErro.innerHTML = `
        <span class="conteudo__mensagem--alerta">${conteudo}</span>
    `;
}

function listaSomatorioEntradas() {
    let somarQuantidade = 0;
    let somarQuantidadeInicial = 0;
    let lista = [];

    listaEntradasDisponiveis.forEach((entrada) => {
        somarQuantidade += entrada.quantidade;
        somarQuantidadeInicial += entrada.quantidadeInicial;
    });

    lista.push(somarQuantidade, somarQuantidadeInicial);
    
    return lista;
}

exibirEntradasDisponiveis();