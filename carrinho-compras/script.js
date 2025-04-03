let elementoPrecoGeral = document.querySelector('#elemento-preco-geral');
let elementoProdutoAdicionado = document.querySelector('#elemento-produto-adicionado');
let elementoMensagemPadrao = document.querySelector('#elemento-mensagem-padrao');
let elementoLimite = document.querySelector('#elemento-limite');
let mensagemErro = document.querySelector('#mensagem-erro');
let precoGeral = 0;
let quantidadeLimite = 11; 

function adicionar() {
    let quantidade = document.querySelector('#quantidade').value;
    let produto = document.querySelector('#produto').value;

    document.querySelector('#quantidade').value = '';

    mensagemErro.innerHTML = '';

    // Validação (campos)
    if ((quantidade && produto) == '') {
        exibirMensagemErro('Preencha todos os campos.');
        return;
    }

    if (quantidade <= 0 || quantidade > quantidadeLimite) {
        exibirMensagemErro(`O intervalo de quantidade deve ser entre 1 e ${quantidadeLimite}, [${quantidade}] não é permitido.`);
        return;
    }

    // Calculo (preço/quantidade)
    let precoProduto = parseInt(produto.split(' ')[1]);
    let nomeProduto = produto.split(' ')[3];

    let precoUnitario = precoProduto * quantidade;
    precoGeral = precoGeral + precoUnitario;

    elementoPrecoGeral.textContent = `R$ ${precoGeral}`;

    // Elemento apagável
    let elementoApagar = elementoProdutoAdicionado.children[0];

    if (elementoApagar.classList[0] == 'conteudo__mensagem') {
        elementoProdutoAdicionado.removeChild(elementoApagar);
    }

    elementoProdutoAdicionado.innerHTML += `
        <li class="conteudo__bloco">
            <span class="conteudo__destaque">${quantidade}x</span> 
            ${nomeProduto} por 
            <span class="conteudo__destaque">R$ ${precoProduto}</span>
        </li>
    `;

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    elementoPrecoGeral.textContent = 'R$ 0';
    mensagemErro.innerHTML = '';
    mensagemAvisoProduto();
}

function exibirMensagemErro(conteudo) {
    mensagemErro.innerHTML += `
        <span class="conteudo__mensagem--alerta">${conteudo}</span>
    `;
}

function mensagemAvisoProduto() {
    elementoProdutoAdicionado.innerHTML = `
        <div class="conteudo__mensagem">
            <span class="conteudo__mensagem--alerta">
                Nenhum produto foi adicionado :(
            </span>
        </div>`;
}

mensagemAvisoProduto();

elementoLimite.textContent = `Limite de quantidade: ${quantidadeLimite}`;