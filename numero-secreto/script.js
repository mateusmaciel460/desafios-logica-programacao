let listaNumerosSorteados = [];
let numeroMinimo = 1;
let numeroMaximo = 5;
let chute;
let numeroSecreto = obterNumeroAleatorio();
let tentativa = 1;

const elementoNumerosSorteados = document.querySelector('#elemento-numeros-sorteados');
const elementoMensagemAlerta = document.querySelector('#elemento-mensagem-alerta');

function chutar() {
    chute = parseInt(document.querySelector('#chute').value);

    if (!validacaoCampo(chute)) return;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemDeSucesso = `Você acertou o número secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`;

        exibirMensagemNaTela('h1', 'Acertou!');
        exibirMensagemNaTela('h2', mensagemDeSucesso);

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
    numeroSecreto = obterNumeroAleatorio();
}

function validacaoCampo(chute) {
    elementoMensagemAlerta.innerHTML = '';
    document.querySelector('#chute').value = '';
    
    if (isNaN(chute)) {
        exibirMensagemAlerta('vermelho', 'alerta', 'Preencha corretamente todos os campos.');
        return false;
    }

    if (chute < numeroMinimo || chute > numeroMaximo) {
        exibirMensagemAlerta('vermelho', 'alerta', `O chute deve ser entre ${numeroMinimo} e ${numeroMaximo}`);
        return false;
    }

    return true;
}

function exibirMensagemAlerta(cor, tipo, texto) {
    elementoMensagemAlerta.innerHTML = `
        <span class="conteudo__mensagem modelo__cor-${cor} conteudo__mensagem--${tipo}">
            ${texto}
        <span/>
    `;
}

function obterNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + numeroMinimo);

    if (listaNumerosSorteados.length == numeroMaximo) {
        listaNumerosSorteados = [];
        exibirNumerosSorteados();
    }

    if (listaNumerosSorteados.includes(numeroAleatorio)) {
        return obterNumeroAleatorio();
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
    exibirMensagemNaTela('h2', `Escolha um número entre ${numeroMinimo} e ${numeroMaximo}`);
}

function exibirNumerosSorteados() {
    elementoNumerosSorteados.innerHTML = '';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        elementoNumerosSorteados.innerHTML += `
            <div class="conteudo__caixa modelo__cor-vermelho" id="numero-escolhido-${i}">
                0${i}
            </div>
        `;
    }
}

function adicionarNumeroSorteado(numeroSecreto) {
    let elementoNumeroSecreto = document.querySelector(`#numero-escolhido-${numeroSecreto}`);
    let classeElementoNumeroSecreto = elementoNumeroSecreto.classList;
    classeElementoNumeroSecreto.add('modelo__cor-verde');
    classeElementoNumeroSecreto.remove('modelo__cor-vermelho');
}

exibirMensagemInicialNaTela();
exibirNumerosSorteados();