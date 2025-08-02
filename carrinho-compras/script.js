const elementoListaProdutos = document.querySelector('#elemento-lista-produtos');
const elementoListaOpcoes = document.querySelector('#opcoes');
const elementoAdicionarProduto = document.querySelector('#elemento-adicionar-produto');
const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoPrecoGeral = document.querySelector('#elemento-preco-geral');

let precoGeral = 0;

const listaProdutos = [
    { id: 1, nome: 'Celular', preco: 1400, quantidade: 4 }, 
    { id: 2, nome: 'Notebook', preco: 5400, quantidade: 9 }, 
    { id: 3, nome: 'Tablet', preco: 2400, quantidade: 11 }
];

function adicionar() {
    let quantidade = parseInt(document.querySelector('#quantidade').value);
    let produto = document.querySelector('#opcoes').value;

    let nomeProduto = produto.split(' ')[3];
    let precoProduto = parseInt(produto.split(' ')[1]);
    let codigoProduto = parseInt(produto.split(' ')[5]);

    if (!validaCampo(quantidade, produto)) return;
    
    atualizarListaProduto(quantidade, nomeProduto, codigoProduto, precoProduto);
}

function exibirOperacaoPrecoProduto(precoProduto, quantidade) {
    let precoPorCompra = precoProduto * quantidade;
    precoGeral += precoPorCompra;

    elementoPrecoGeral.innerHTML = precoGeral;
}

function atualizarListaProduto(quantidade, nomeProduto, codigoProduto, precoProduto) {
    let verificarQuantidade = quantidade > 1 ? 'quantidades disponíveis' : 'quantidade disponível';

    listaProdutos.forEach((produto) => {
        if (produto.id === codigoProduto) {
            if (quantidade > produto.quantidade) {
                exibirMensagemAviso('alerta', 'vermelha', `Não temos ${quantidade} ${verificarQuantidade} para o produto ${nomeProduto}`);
                return false;
            } else {
                exibirElementoAdicionarProduto(quantidade, nomeProduto, precoProduto);
                exibirOperacaoPrecoProduto(precoProduto, quantidade);
                produto.quantidade -= quantidade;
            }

            if (produto.quantidade === 0) {
                const index = listaProdutos.findIndex(item => item.id === produto.id);

                if (index !== -1) {
                    listaProdutos.splice(index, 1);
                }
            }
        }
    });

    exibirListaProdutosNaTela();
}

function validaCampo(quantidade, produto) {
    elementoMensagemAviso.innerHTML = '';
     document.querySelector('#quantidade').value = '';

    if (isNaN(quantidade) || produto == 0 || quantidade <= 0) {
        exibirMensagemAviso('alerta', 'vermelha', 'Preencha corretamente todos os campos');
        return false;
    }

    return true;
}

function exibirMensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function exibirElementoAdicionarProduto(quantidade, nomeProduto, precoProduto) {
    elementoAdicionarProduto.innerHTML += `
        <div class="conteudo__caixa conteudo__texto-personalizado">
            <span class="conteudo__destaque">${quantidade}x</span>
            ${nomeProduto} por
            <span class="conteudo__destaque">R$ ${precoProduto}</span>
        </div>
    `;
}

function exibirListaProdutosNaTela() {
    elementoListaProdutos.innerHTML = '';
    elementoListaOpcoes.innerHTML = ''

    let verificarQuantidade;

    listaProdutos.forEach((produto) => {
        verificarQuantidade = produto.quantidade <= 0 ? 'vermelha' : 'verde';

        elementoListaProdutos.innerHTML += `
            <div class="modelo__vertical conteudo__caixa modelo__centralizado">
                <h2 class="conteudo__subtitulo">${produto.nome}</h2>
                <p class="conteudo__texto">R$ ${produto.preco}</p>
                <span class="conteudo__tag modelo__cor-${verificarQuantidade}">Quantidade: ${produto.quantidade}</span>
            </div>
        `;

        elementoListaOpcoes.innerHTML += `
            <option value="R$ ${produto.preco} - ${produto.nome} - ${produto.id}">
                R$ ${produto.preco} - ${produto.nome}
            </option>
        `;
    });

    verificarQuantidadeElementosNaLista(elementoListaProdutos, 1);
    verificarQuantidadeElementosNaLista(elementoListaOpcoes, 2);
}

function verificarQuantidadeElementosNaLista(elementoEscolhido, nivel) {
    if (listaProdutos.length == 0) {
        if (nivel == 1) {
             elementoEscolhido.innerHTML = `
                <div class="conteudo__mensagens modelo__vertical modelo__centralizado">
                    <span class="conteudo__mensagem modelo__cor-vermelha">
                        Nenhum produto disponível.
                    </span>
                </div>
            `;
        }

        if (nivel == 2) {
            elementoEscolhido.innerHTML = `
                <option value="0">Nenhum produto disponível.</option>
            `;
        }

        document.querySelector('#botao-adicionar').setAttribute('disabled', true);
    }
}

exibirListaProdutosNaTela();