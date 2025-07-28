let listaNumerosSorteados = [];
let numeroMinimo = 1;
let numeroMaximo = 5;
let chute;
let numeroSecreto = obterNumeroSecreto();
let tentativa = 1;

const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoNumerosSorteados = document.querySelector('#elemento-numeros-sorteados');

function chutar() {
    chute = parseInt(document.querySelector('#chute').value);

    if (!validaCampo(chute)) return;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';

        exibirMensagemNaTela('h1', `Acertou!`);
        exibirMensagemNaTela('h2', `Você acertou o número secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`);

        document.querySelector('#botao-chutar').setAttribute('disabled', true);
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');

        adicionarNumeroSorteado(numeroSecreto);
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

function validaCampo(chute) {
    elementoMensagemAviso.innerHTML = '';
    document.querySelector('#chute').value = '';

    if (isNaN(chute)) {
        exibirAvisoNaTela('alerta', 'vermelha', 'Preencha corretamente o campo do chute');
        return false;
    }

    if (chute < numeroMinimo || chute > numeroMaximo) {
        exibirAvisoNaTela('alerta', 'vermelha', `O número deve ser entre ${numeroMinimo} e ${numeroMaximo}`);
        return false;
    }

    return true;
}

function exibirAvisoNaTela(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function obterNumeroSecreto() {
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + numeroMinimo);

    if (listaNumerosSorteados.length == numeroMaximo) {
        listaNumerosSorteados = [];
        exibirNumerosSorteados();
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
    exibirMensagemNaTela('h1', `Número Secreto`);
    exibirMensagemNaTela('h2', `Digite um número entre ${numeroMinimo} e ${numeroMaximo}`);
}

function exibirNumerosSorteados() {
    elementoNumerosSorteados.innerHTML = '';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        elementoNumerosSorteados.innerHTML += `
            <div class="conteudo__caixa modelo__cor-vermelha" id="numero-sorteado-${i}">
                0${i}
            </div>
        `;
    }
}

function adicionarNumeroSorteado(numeroSecreto) {
    let elementoNumero = document.querySelector(`#numero-sorteado-${numeroSecreto}`);
    let classeElementoNumero = elementoNumero.classList;
    
    classeElementoNumero.add('modelo__cor-verde');
    classeElementoNumero.remove('modelo__cor-vermelha');
}

exibirMensagemInicialNaTela();
exibirNumerosSorteados();