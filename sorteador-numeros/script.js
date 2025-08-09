const elementoNumeroSorteado = document.querySelector('#elemento-numero-sorteado');
const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');

function sortear() {
    let opcaoEscolhida = parseInt(document.querySelector('#opcao-escolhida').value);
    let numeroMinimo = parseInt(document.querySelector('#numero-minimo').value);
    let numeroMaximo = parseInt(document.querySelector('#numero-maximo').value);
    let numeroQuantidade = parseInt(document.querySelector('#numero-quantidade').value);

    if (!validarCampo(opcaoEscolhida, numeroMinimo, numeroMaximo, numeroQuantidade)) return;

    let listaNumerosSorteados = [];
    let numeroAleatorio = 0;

    for (let i = numeroMinimo; i <= numeroQuantidade; i++) {
        numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);

        while (listaNumerosSorteados.includes(numeroAleatorio) || !verificarOpcaoEscolhida(numeroAleatorio, opcaoEscolhida)) {
            numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
        }

        listaNumerosSorteados.push(numeroAleatorio);
    }

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    exibirNumerosSorteadosNaTela(numeroMaximo, listaNumerosSorteados);
    exibirMensagemNumeroSorteado(listaNumerosSorteados);
}

function verificarOpcaoEscolhida(numeroAleatorio, opcaoEscolhida) {
    if (opcaoEscolhida === 2) {
        return numeroAleatorio % 2 === 0;
    }

    if (opcaoEscolhida === 3) {
        return numeroAleatorio % 2 !== 0;
    }

    return true;
}

function exibirMensagemNumeroSorteado(listaNumerosSorteados) {
    listaNumerosSorteados.sort(compararNumeros);

    exibirMensagemAviso(
        'sucesso', 'verde', 
        `Números sorteados: ${listaNumerosSorteados.join(', ')}`
    );
}

function compararNumeros(numeroInicial, numeroFinal) {
    return numeroInicial - numeroFinal;
}

function exibirMensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    elementoMensagemAviso.innerHTML = '';
    exibirMensagemInicialNaTela();
    limparCampo();
}

function validarCampo(opcaoEscolhida, numeroMinimo, numeroMaximo, numeroQuantidade) {
    let quantidadeLimiteComum = numeroMaximo - numeroMinimo + 1;
    let quantidadeLimiteEspecial = parseInt((numeroMaximo - numeroMinimo + 1) / 2);

    exibirMensagemInicialNaTela();
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);

    if (isNaN(numeroMinimo) || isNaN(numeroMaximo) || isNaN(numeroQuantidade)) {
        exibirMensagemAviso('alerta', 'vermelha', 'Preencha corretamente todos os campos');
        return false;
    }

    if (opcaoEscolhida !== 1 && numeroQuantidade > quantidadeLimiteEspecial) {
        document.querySelector('#numero-quantidade').value = '';
        exibirMensagemAviso('alerta', 'vermelha', `A quantidade limite é ${quantidadeLimiteEspecial}, e não ${numeroQuantidade}`);
        return false;
}

    
    if (numeroQuantidade > quantidadeLimiteComum) {
        document.querySelector('#numero-quantidade').value = '';
        exibirMensagemAviso('alerta', 'vermelha', `A quantidade limite é ${quantidadeLimiteComum}, e não ${numeroQuantidade}`);
        return false;
    }

    limparCampo();
    
    return true;
}

function limparCampo() {
    document.querySelector('#opcao-escolhida').value = '1';
    document.querySelector('#numero-minimo').value = '';
    document.querySelector('#numero-maximo').value = '';
    document.querySelector('#numero-quantidade').value = '';
}

function exibirMensagemInicialNaTela() {
    elementoNumeroSorteado.innerHTML = `
        <p class="conteudo__texto conteudo__destaque">
            Esperando o sorteio...
        </p>
    `;
}

function exibirNumerosSorteadosNaTela(numeroMaximo, listaNumerosSorteados) {
    elementoNumeroSorteado.innerHTML = '';

    let verificarNumerosSorteados;

    for (let i = 1; i <= numeroMaximo; i++) {
        verificarNumerosSorteados = listaNumerosSorteados.includes(i) ? 'verde' : 'vermelha';

        elementoNumeroSorteado.innerHTML += `
            <div class="conteudo__caixa modelo__cor-${verificarNumerosSorteados}">
                0${i}
            </div>
        `;
    }
}

function obterNumeroAleatorio(numeroMinimo, numeroMaximo) {
    return parseInt(Math.random() * (numeroMaximo - numeroMinimo + 1) + numeroMinimo);
}

exibirMensagemInicialNaTela();