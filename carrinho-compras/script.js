const elementoProdutoAdicionado = document.querySelector('#elemento-produto-adicionado');
const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoOpcaoProdutos = document.querySelector('#produto');
const elementoExibicaoProdutos = document.querySelector('#elemento-exibicao-produtos');
const elementoPrecoGeral = document.querySelector('#elemento-preco-geral');

const listaProdutos = [
    { id: 1, nome: 'Celular', preco: 1400, quantidade: 4 },
    { id: 2, nome: 'Notebook', preco: 5400, quantidade: 9 },
    { id: 3, nome: 'Tablet', preco: 2400, quantidade: 11 }
];

let precoGeral = 0;

function adicionar() {
    let quantidade = parseInt(document.querySelector('#numero-quantidade').value);
    let produto = document.querySelector('#produto').value;

    let precoProduto = parseInt(produto.split(' ')[1]);
    let nomeProduto = produto.split(' ')[3];
    let idProduto = parseInt(produto.split(' ')[5]);

    if (!validarCampo(quantidade, produto)) return;

    verificarProdutoAdicionado(quantidade, precoProduto, nomeProduto, idProduto);
}

function verificarProdutoAdicionado(quantidade, precoProduto, nomeProduto, idProduto) {
    let verificarQuantidade = quantidade > 1 ? 'quantidades disponíveis' : 'quantidade disponível';

    listaProdutos.forEach((produto) => {
        if (produto.id === idProduto) {

            if (quantidade > produto.quantidade) {
                exibirMensagemAviso('alerta', 'vermelha', `Não temos ${quantidade} ${verificarQuantidade} para o produto ${nomeProduto}`);
                return false;
            }

            if (quantidade <= produto.quantidade) {
                produto.quantidade -= quantidade;
                adicionarProdutoNoCarrinho(quantidade, nomeProduto, precoProduto);
                atualizarPrecoGeral(precoProduto, quantidade);
            }

            if (produto.quantidade === 0) {
                const index = listaProdutos.findIndex((item) => item.id === produto.id);

                if (index != -1) {
                    listaProdutos.splice(index, 1);
                }
            }

            exibirListaProdutosNaTela();
        }
    });
}

function atualizarPrecoGeral(preco, quantidade) {
    let precoAtual = preco * quantidade;
    precoGeral += precoAtual;
    elementoPrecoGeral.textContent = precoGeral;
}

function adicionarProdutoNoCarrinho(quantidade, nomeProduto, precoProduto) {
    elementoProdutoAdicionado.innerHTML += `
        <div class="conteudo__caixa">
            <p class="conteudo__texto">
                <span class="conteudo__destaque">${quantidade}x</span> -
                ${nomeProduto} 
                <span class="conteudo__destaque">R$ ${precoProduto}</span>
            </p>
        </div>
    `;
}

function validarCampo(quantidade, produto) {
    document.querySelector('#numero-quantidade').value = '';
    elementoMensagemAviso.innerHTML = '';

    if (isNaN(quantidade) || produto == '') {
        exibirMensagemAviso('alerta', 'vermelha', `Preencha corretamente todos os campos`);
        return false;
    }

    return true;
}

function exibirListaProdutosNaTela() {
    elementoOpcaoProdutos.innerHTML = '';
    elementoExibicaoProdutos.innerHTML = '';

    let verificarQuantidadeDisponivel;

    listaProdutos.forEach((produto) => {
        elementoOpcaoProdutos.innerHTML += `
            <option value="R$ ${produto.preco} - ${produto.nome} - ${produto.id}">
                R$ ${produto.preco} - ${produto.nome}
            </option>
        `;

        verificarQuantidadeDisponivel = produto.quantidade > 0 ? 'verde' : 'vermelha';

        elementoExibicaoProdutos.innerHTML += `
            <div class="conteudo__caixa modelo__vertical">
                <h2 class="conteudo__subtitulo">${produto.nome}</h2>
                <p class="conteudo__texto">R$ ${produto.preco}</p>
                <span class="conteudo__tag modelo__cor-${verificarQuantidadeDisponivel}">
                    Quantidade: ${produto.quantidade}
                </span>
            </div>
        `;
    });

    verificarLimiteListaProdutoAtingido();
}

function verificarLimiteListaProdutoAtingido() {
    if (listaProdutos.length === 0) {
        elementoOpcaoProdutos.innerHTML = `
            <option value="0">
                Nenhum produto disponível :(
            </option>
        `;

        elementoExibicaoProdutos.innerHTML = `
            <div class="conteudo__mensagens modelo__vertical modelo__centralizado">
                <span class="conteudo__mensagem conteudo__alerta modelo__cor-vermelha">
                    Nenhum produto disponível até o momento.
                </span>
            </div>
        `;

        document.querySelector('#botao-adicionar').setAttribute('disabled', true);
    }
}

function exibirMensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

exibirListaProdutosNaTela();