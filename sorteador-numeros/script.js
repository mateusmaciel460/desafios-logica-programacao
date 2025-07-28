const elementoAvisoMensagem = document.querySelector('#elemento-aviso-mensagem');
const elementoNumerosSorteados = document.querySelector('#elemento-numeros-sorteados');

function sortear() {
    let tipoEscolha = parseInt(document.querySelector('#tipo-escolha').value);
    let numeroMinimo = parseInt(document.querySelector('#numero-minimo').value);
    let numeroMaximo = parseInt(document.querySelector('#numero-maximo').value);
    let numeroQuantidade = parseInt(document.querySelector('#numero-quantidade').value);

    let listaNumerosSorteados = [];
    let numeroAleatorio;

    if (!validaCampo(numeroMinimo, numeroMaximo, numeroQuantidade, tipoEscolha)) return;

    for (let i = numeroMinimo; i <= numeroQuantidade; i++) {
        numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);

        while (listaNumerosSorteados.includes(numeroAleatorio) || !verificarTipoEscolhido(tipoEscolha, numeroAleatorio)) {
            numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
        }

        listaNumerosSorteados.push(numeroAleatorio);
    }

    listaNumerosSorteados.sort(compararNumerosSorteados);

    let numerosSorteados = listaNumerosSorteados.join(', ');
    exibirAvisoMensagem('sucesso', 'verde', `Números sorteados: ${numerosSorteados}`);
    exibirNumerosSorteadosNaTela(numeroMinimo, numeroMaximo, listaNumerosSorteados);

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    limparCampos();
}

function validaCampo(numeroMinimo, numeroMaximo, numeroQuantidade, tipoEscolha) {
    exibirMensagemInicial();
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);

    let numeroQuantidadeLimite = numeroMaximo - numeroMinimo + 1;
    let verificarExcecao = parseInt(numeroMaximo / 2);

    if (isNaN(numeroMinimo) || isNaN(numeroMaximo) || isNaN(numeroQuantidade)) {
        exibirAvisoMensagem('alerta', 'vermelha', `Preencha corretamente todos os campos`);
        return false;
    }

    if (tipoEscolha != 1 && numeroQuantidade > (verificarExcecao)) {
        exibirAvisoMensagem('alerta', 'vermelha', `O número máximo para quantidade é ${verificarExcecao}`)
        return false;
    }

    if (numeroQuantidade > (numeroQuantidadeLimite)) {
        exibirAvisoMensagem('alerta', 'vermelha', `O número máximo para quantidade é ${numeroQuantidadeLimite}`)
        return false;
    }

    return true;
}

function verificarTipoEscolhido(tipoEscolha, numeroAleatorio) {
    if (tipoEscolha === 2) {
        return numeroAleatorio % 2 == 0;
    } 

    if (tipoEscolha === 3) {
        return numeroAleatorio % 2 !== 0;
    }

    return true;
}

function compararNumerosSorteados(numeroA, numeroB) {
    return numeroA - numeroB;
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    exibirMensagemInicial();
    elementoAvisoMensagem.innerHTML = '';
    limparCampos();
}

function limparCampos() {
    document.querySelector('#numero-minimo').value = '';
    document.querySelector('#numero-maximo').value = '';
    document.querySelector('#numero-quantidade').value = '';
}

function obterNumeroAleatorio(numeroMinimo, numeroMaximo) {
    return parseInt(Math.random() * (numeroMaximo - numeroMinimo + 1) + numeroMinimo);
}

function exibirAvisoMensagem(tipo, cor, texto) {
    elementoAvisoMensagem.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function exibirMensagemInicial() {
    elementoNumerosSorteados.innerHTML = `
        <p class="conteudo__texto">
            <span class="conteudo__destaque">Esperando o sorteio....</span>
        </p>
    `;
}

function exibirNumerosSorteadosNaTela(numeroMinimo, numeroMaximo, listaNumerosSorteados) {
    elementoNumerosSorteados.innerHTML = '';

    let verificarNumero;

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        verificarNumero = listaNumerosSorteados.includes(i) ? 'verde' : 'vermelha';

        elementoNumerosSorteados.innerHTML += `
            <div class="conteudo__caixa modelo__cor-${verificarNumero}">
                ${i}
            </div>
        `;
    }
}

exibirMensagemInicial();