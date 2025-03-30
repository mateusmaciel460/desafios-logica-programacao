let mensagemErro = document.querySelector('#mensagem-erro');

let listaNumeros = [];
let numeroMinimo = 1;
let numeroMaximo = 5;
let numeroSecreto = obterNumeroSecreto();
let tentativa = 1;
let chute;

function chutar() {
    chute = document.querySelector('#chute').value;
    document.querySelector('#chute').value = '';

    mensagemErro.innerHTML = '';
    if (chute == '') {
        exibirMensagemErro('Preencha todos os campos!');
        return;
    }

    if ((chute < numeroMinimo) || (chute > numeroMaximo)) {
        exibirMensagemErro(`O intervalo é entre ${numeroMinimo} e ${numeroMaximo} - Não é permitido o número ${chute}`);
        return;
    }

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';

        mostrarMensagemNaTela('h1', 'Acertou!');
        mostrarMensagemNaTela('h3', `Parabéns, você acertou o número secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`);

        document.querySelector('#botao-chutar').setAttribute('disabled', true); 
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            mostrarMensagemNaTela('h3', `O número secreto é menor que ${chute}`);
        } else {
            mostrarMensagemNaTela('h3', `O número secreto é maior que ${chute}`);
        }

        tentativa++;
    }
}

function reiniciar() {
    document.querySelector('#botao-chutar').removeAttribute('disabled');
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    mostrarMensagemInicialNaTela();
    tentativa = 1;
    numeroSecreto = obterNumeroSecreto();
}

function obterNumeroSecreto() {
    let numeroSorteado = parseInt(Math.random() * numeroMaximo + numeroMinimo);

    if (listaNumeros.length == numeroMaximo) {
        listaNumeros = [];
    }

    if (listaNumeros.includes(numeroSorteado)) {
        return obterNumeroSecreto();
    } else {
        listaNumeros.push(numeroSorteado);
        console.log(listaNumeros);
        return numeroSorteado;
    }
}

function exibirMensagemErro(conteudo) {
    mensagemErro.innerHTML += `
        <span class="conteudo__mensagem--alerta">${conteudo}</span>
    `;
}

function mostrarMensagemNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.textContent = texto;
}

function mostrarMensagemInicialNaTela() {
    mostrarMensagemNaTela('h1', 'Jogo do Número Secreto');
    mostrarMensagemNaTela('h3', `Escolha um número entre ${numeroMinimo} e ${numeroMaximo}`);
}

mostrarMensagemInicialNaTela();