let elementoSelecaoProdutos = document.querySelector('#produto');
let elementoListaProdutos = document.querySelector('#elemento-lista-produtos');
let elementoProdutosAdicionados = document.querySelector('#elemento-produtos-adicionados');
let elementoMensagemErro = document.querySelector('#elemento-mensagem-erro');
let elementoPrecoGeral = document.querySelector('#elemento-preco-geral');

let precoGeral = 0;

const listagemProdutos = [
    { id: 1, nome: 'Teclado', preco: 250, quantidade: 6 },
    { id: 2, nome: 'Notebook', preco: 3600, quantidade: 4 },
    { id: 3, nome: 'Celular', preco: 2500, quantidade: 9 }
];

function adicionar() {
    let quantidade = parseInt(document.querySelector('#quantidade').value);
    let produto = elementoSelecaoProdutos.value.split(' ');
    let nomeProduto = produto[3];
    let precoProduto = parseInt(produto[1]);
    
    elementoMensagemErro.innerHTML = '';

    if (!validaoCampos(quantidade, elementoSelecaoProdutos)) return;

    // Cálculo
    let precoBruto = quantidade * precoProduto;
    precoGeral += precoBruto;
    elementoPrecoGeral.textContent = precoGeral;

    listagemProdutos.forEach((produto) => {
        let elementoSpanQuantidade = document.querySelector(`#produto-${produto.id}`);
        let palavraQuantidade = quantidade > 1 ? 'quantidades disponíveis' : 'quantidade disponível';

        if (produto.nome == nomeProduto) {
            if (quantidade > produto.quantidade) {
                exibirMensagemErro(`Não temos ${quantidade} ${palavraQuantidade} para ${produto.nome}.`);
            } else {
                atualizandoProdutoInseridoNoCarrinho(produto, quantidade, elementoSpanQuantidade, elementoProdutosAdicionados, nomeProduto, precoProduto);
            }
        }
    });

    let quantidadeTotal = calcularQuantidadeTotal();

    if (quantidadeTotal == 0) {
        document.querySelector('#botao-adicionar').setAttribute('disabled', true);
        exibirMensagemErro('A lista contém zero quantidade para todos itens :(');
    }

    document.querySelector('#quantidade').value = '';
}

function atualizandoProdutoInseridoNoCarrinho(produto, quantidade, elementoSpanQuantidade, elementoProdutosAdicionados, nomeProduto, precoProduto) {
    produto.quantidade -= quantidade;
    exibirProdutoAdicionadoNaTela(elementoProdutosAdicionados, quantidade, nomeProduto, precoProduto);
    elementoSpanQuantidade.textContent = `Quantidade: ${produto.quantidade}`;
    
    mudarColoracaoPelaQuantidade(produto, elementoSpanQuantidade);
}

function mudarColoracaoPelaQuantidade(produto, elementoSpanQuantidade) {
    if (produto.quantidade == 0) {
        elementoSpanQuantidade.classList.remove('conteudo__verde');
        elementoSpanQuantidade.classList.add('conteudo__vermelho');
    }
}

function validaoCampos(quantidade, elementoSelecaoProdutos) {
    // Validação
    if (quantidade <= 0) {
        exibirMensagemErro('A quantidade não pode ser igual ou menor que zero!');
        return false;
    }
    
    if (isNaN(quantidade) || elementoSelecaoProdutos.value == '') {
        exibirMensagemErro('Preencha todos os campos corretamente');
        return false;
    }

    return true;
}

function exibirProdutoAdicionadoNaTela(elementoAdicionado, quantidadeProduto, nomeProduto, precoProduto) {
    elementoAdicionado.innerHTML += `
        <li class="conteudo__bloco conteudo__texto">
            <span class="conteudo__destaque">${quantidadeProduto}x</span> 
            ${nomeProduto} -
            <span class="conteudo__destaque">R$ ${precoProduto}</span>
        </li>
    `;
}

function calcularQuantidadeTotal() {
    let totalQuantidade = 0;

    listagemProdutos.forEach((produto) => {
        totalQuantidade += produto.quantidade;
    });

    return totalQuantidade;
}

function exibirMensagemErro(conteudo) {
    elementoMensagemErro.innerHTML = `
        <span class="conteudo__mensagem--alerta conteudo__mensagem-rotacao">
            ${conteudo}
        </span>
    `;
}

function exibirListagemProdutosNaTela() {
    elementoSelecaoProdutos.innerHTML = '';
    elementoListaProdutos.innerHTML = '';

    listagemProdutos.forEach((produto) => {
        elementoSelecaoProdutos.innerHTML += `
            <option value="R$ ${produto.preco} - ${produto.nome}">
                R$ ${produto.preco} - ${produto.nome}
            </option>
        `;

        elementoListaProdutos.innerHTML += `
            <div class="conteudo__bloco modelo__vertical">
                <h3 class="conteudo__subtitulo-2">${produto.nome}</h3>
                <span class="conteudo__verde conteudo__texto" id="produto-${produto.id}">
                    Quantidade: ${produto.quantidade}
                </span>
                <p class="conteudo__texto">R$ ${produto.preco}</p>
            </div>
        `;
    });
}

exibirListagemProdutosNaTela();