let mensagemErro = document.querySelector('#mensagem-erro');
let elementoNumerosPossiveis = document.querySelector('#elemento-numeros-possiveis');
let listaNumeros = [];
let listaNumerosAcertados = [];
let numeroMinimo = 1;
let numeroMaximo = 5;
let numeroSecreto = obterNumeroSecreto();
let tentativa = 1;
let chute;

function chutar() {
    chute = parseInt(document.querySelector('#chute').value);
    document.querySelector('#chute').value = '';

    if (!validarCampos()) return;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';

        mostrarMensagemNaTela('h1', 'Acertou!');
        mostrarMensagemNaTela('h3', `Parabéns, você acertou o número secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`);

        document.querySelector('#botao-chutar').setAttribute('disabled', true); 
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');
        document.querySelector('#chute').setAttribute('disabled', true);

        listaNumerosAcertados.push(chute);
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
    document.querySelector('#chute').removeAttribute('disabled');
    mostrarMensagemInicialNaTela();
    tentativa = 1;
    numeroSecreto = obterNumeroSecreto();
    exibirPossiveisNumerosSecretos();
}

function validarCampos() {
    mensagemErro.innerHTML = '';

    if (chute == '' || isNaN(chute)) {
        exibirMensagemAvisoNaTela(
            mensagemErro, 'alerta', 'Preencha corretamente todos os campos!');
        return false;
    }

    if ((chute < numeroMinimo) || (chute > numeroMaximo)) {
        exibirMensagemAvisoNaTela(
            mensagemErro, 'alerta',`Escolha um número entre ${numeroMinimo} e ${numeroMaximo}`);
        return false;
    }

    return true;
}

function exibirPossiveisNumerosSecretos() {
    let verificarSeNumeroFoiAcertado;

    elementoNumerosPossiveis.innerHTML = '';

    for (let contador = 0; contador < numeroMaximo; contador++) {
        verificarSeNumeroFoiAcertado = listaNumerosAcertados.includes(contador + 1);

        elementoNumerosPossiveis.innerHTML += `
            <div class="conteudo__bloco conteudo__texto ${verificarSeNumeroFoiAcertado ? 'conteudo__verde' : 'conteudo__vermelho'}">
                ${contador + 1}
            </div>
        ` ;
    }
}

function obterNumeroSecreto() {
    let numeroSorteado = parseInt(Math.random() * numeroMaximo + numeroMinimo);

    if (listaNumeros.length == numeroMaximo) {
        listaNumeros = [];
        listaNumerosAcertados = [];
        exibirPossiveisNumerosSecretos();
    }

    if (listaNumeros.includes(numeroSorteado)) {
        return obterNumeroSecreto();
    } else {
        listaNumeros.push(numeroSorteado);
        return numeroSorteado;
    }
}

function exibirMensagemAvisoNaTela(elementoEscolhido, operacao, conteudo) {
    elementoEscolhido.innerHTML = `
        <span class="conteudo__mensagem--${operacao} conteudo__mensagem-rotacao">
            ${conteudo}
        </span>
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
exibirPossiveisNumerosSecretos();