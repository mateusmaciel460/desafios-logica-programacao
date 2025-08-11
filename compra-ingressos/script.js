const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoCadeiras = document.querySelector('#elemento-cadeiras');
const elementoMensagemInicial = document.querySelector('#elemento-mensagem-inicial');
const elementoAssentoEscolhido = document.querySelector('#elemento-assento-escolhido');
const elementoIngressoCompra = document.querySelector('#elemento-ingresso-compra');
const elementoPrecoCompra = document.querySelector('#elemento-preco-compra');
const elementoPrecoIngresso = document.querySelector('#elemento-preco-ingresso');

let quantidadeCadeiras = 16;
let listaCadeirasAdicionadas = [];
let listaCadeirasCompradas = [];
let listaIngressoCompra = [];

let precoIngresso = 25;
let precoCompra = 0;

function comprarIngresso() {
    let nomeComprador = document.querySelector('#nome-comprador').value;

    if (!validarCampo(nomeComprador)) return;

    listaIngressoCompra.push({
        nome: nomeComprador, cadeiras: listaCadeirasAdicionadas
    });

    protegerCadeirasCompradas(listaCadeirasAdicionadas, nomeComprador);
    listaCadeirasAdicionadas = [];
    exibirCompra();
    verificarListaCadeiras();

    precoCompra = 0;
    atualizarPreco();
}

function reiniciar() {
    listaCadeirasCompradas = [];
    document.querySelector('#botao-comprar').removeAttribute('disabled');
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    exibirCadeirasDisponíveisNaTela();
    atualizarPreco();
    elementoIngressoCompra.textContent = 'Nenhum ingresso comprado';
}

function atualizarPreco() {
    elementoPrecoIngresso.textContent = precoIngresso;
    elementoPrecoCompra.textContent = precoCompra;
}

function validarCampo(nomeComprador) {
    elementoMensagemAviso.innerHTML = '';

    if (nomeComprador == '') {
        exibirMensagemAviso('alerta', 'vermelha', 'Preencha o campo (nome do comprador)');
        return false;
    }

    if (listaCadeirasAdicionadas.length === 0) {
        exibirMensagemAviso('alerta', 'vermelha', `Você precisa escolher no mínimo uma cadeira`);
        return false;
    }

    document.querySelector('#nome-comprador').value = '';

    return true;
}

function exibirMensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function protegerCadeirasCompradas(listaCadeirasAdicionadas, nomeComprador) {
    listaCadeirasAdicionadas.forEach((cadeira) => {
        let elementoCadeira = document.querySelector(`#elemento-cadeira-${cadeira}`);
        let classeElementoCadeira = elementoCadeira.classList;

        classeElementoCadeira.add('modelo__cor-cinza', 'conteudo__bloqueio');
        classeElementoCadeira.remove('modelo__cor-vermelha');

        elementoCadeira.removeAttribute('onclick');
        elementoCadeira.setAttribute('title', nomeComprador);
    });
}

function exibirCompra() {
    elementoIngressoCompra.innerHTML = '';

    listaIngressoCompra.forEach((compra) => {
        elementoIngressoCompra.innerHTML += `
            <div class="conteudo__caixa">
                <p class="conteudo__texto">
                    Comprador: <span class="conteudo__destaque">${compra.nome}</span> |
                    Cadeiras: ${compra.cadeiras.join(', ')}
                </p>
            </div>
        `;
    })
}

function exibirCadeirasDisponíveisNaTela() {
    elementoCadeiras.innerHTML = '';

    for (let i = 1; i <= quantidadeCadeiras; i++) {
        elementoCadeiras.innerHTML += `
            <div onclick="adicionarCadeira(${i})" class="conteudo__caixa modelo__cor-verde" id="elemento-cadeira-${i}">
                0${i}
            </div>
        `;
    }
}

function adicionarCadeira(cadeiraEscolhida) {
    listaCadeirasAdicionadas.push(cadeiraEscolhida);
    listaCadeirasCompradas.push(cadeiraEscolhida);
    escolhendoCadeiras(
        cadeiraEscolhida, 
        'modelo__cor-verde', 
        'modelo__cor-vermelha', 
        'resetarCadeira'
    );

    precoCompra += precoIngresso;
    atualizarPreco();
}

function resetarCadeira(cadeiraEscolhida) {
    const buscarCadeira = listaCadeirasAdicionadas.indexOf(cadeiraEscolhida);

    if (buscarCadeira > -1) {
        listaCadeirasAdicionadas.splice(buscarCadeira, 1);
    }

    escolhendoCadeiras(
        cadeiraEscolhida, 
        'modelo__cor-vermelha', 
        'modelo__cor-verde', 
        'adicionarCadeira'
    );

    precoCompra -= precoIngresso;
    atualizarPreco();
}

function escolhendoCadeiras(cadeiraEscolhida, modeloRemocao, modeloAdicionar, nomeFuncao) {
    const elementoCadeira = document.querySelector(`#elemento-cadeira-${cadeiraEscolhida}`);
    const elementoCadeiraClasse = elementoCadeira.classList;

    elementoCadeiraClasse.remove(modeloRemocao);
    elementoCadeiraClasse.add(modeloAdicionar);

    elementoCadeira.removeAttribute('onclick');
    elementoCadeira.setAttribute('onclick', `${nomeFuncao}(${cadeiraEscolhida})`);

    elementoAssentoEscolhido.textContent = 
        `Assento(s): ${listaCadeirasAdicionadas.join(', ')}`;
}

function verificarListaCadeiras() {
    if (listaCadeirasAdicionadas.length === 0) {
        elementoAssentoEscolhido.textContent = 'Nenhum assento escolhido.';
    }

    if (listaIngressoCompra.length === 0) {
        elementoIngressoCompra.textContent = 'Nenhum ingresso comprado.';
    }

    if (listaCadeirasCompradas.length === quantidadeCadeiras) {
        document.querySelector('#botao-comprar').setAttribute('disabled', true);
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    }
}

exibirCadeirasDisponíveisNaTela();
atualizarPreco();