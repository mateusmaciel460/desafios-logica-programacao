let listaNumerosSorteados = [];
let numeroMinimo = 1;
let numeroMaximo = 4;
let numeroSecreto = obterNumeroSecreto();
let chute;
let tentativa = 1;

const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoNumeroSorteado = document.querySelector('#elemento-numero-sorteado');

function chutar() {
    chute = parseInt(document.querySelector('#chute').value);

    if (!validarCampo(chute)) return;

    if (chute === numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemSucesso = `Você acertou o número secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`;

        exibirMensagemNaTela('h1', 'Parabéns, acertou!');
        exibirMensagemNaTela('h2', mensagemSucesso);

        document.querySelector('#botao-chutar').setAttribute('disabled', true);
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');

        adicionarNumeroSorteado(chute);
    } else {
        if (chute > numeroSecreto) {
            exibirMensagemNaTela('h2', `O número secreto é menor que ${chute}`);
        } else {
            exibirMensagemNaTela('h2', `O número secreto é maior que ${chute}`);
        }

        tentativa++;
    }
}

function reiniciar() {
    document.querySelector('#botao-chutar').removeAttribute('disabled');
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    exibirMensagemInicialNaTela();
    tentativa = 1;
    numeroSecreto = obterNumeroSecreto();
}

function validarCampo(chute) {
    elementoMensagemAviso.innerHTML = '';
    document.querySelector('#chute').value = '';

    if (isNaN(chute)) {
        mensagemAviso('alerta', 'vermelha', 'Preencha corretamente o campo de chute');
        return false;
    }

    if (chute < numeroMinimo || chute > numeroMaximo) {
        mensagemAviso('alerta', 'vermelha', `Digite um número entre ${numeroMinimo} e ${numeroMaximo}, o número ${chute} não é permitido`);
        return false;
    }

    return true;
}

function mensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function exibirNumerosSorteadosNaTela() {
    elementoNumeroSorteado.innerHTML = '';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        elementoNumeroSorteado.innerHTML += `
            <div class="conteudo__caixa modelo__cor-vermelha" id="numero-sorteado-${i}">
                0${i}
            </div>
        `;
    }
}

function adicionarNumeroSorteado(numeroEscolhido) {
    const elementoNumero = document.querySelector(`#numero-sorteado-${numeroEscolhido}`);
    const classeElementoNumero = elementoNumero.classList;

    classeElementoNumero.remove('modelo__cor-vermelha');
    classeElementoNumero.add('modelo__cor-verde');
}

function obterNumeroSecreto() {
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + numeroMinimo);

    if (listaNumerosSorteados.length == numeroMaximo) {
        listaNumerosSorteados = [];
        exibirNumerosSorteadosNaTela();
    }

    if (listaNumerosSorteados.includes(numeroAleatorio)) {
        return obterNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function exibirMensagemNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.textContent = texto;
}

function exibirMensagemInicialNaTela() {
    exibirMensagemNaTela('h1', 'Número Secreto');
    exibirMensagemNaTela('h2', `Digite um número entre ${numeroMinimo} e ${numeroMaximo}`);
}

exibirMensagemInicialNaTela();
exibirNumerosSorteadosNaTela();