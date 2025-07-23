const elementoNumerosEscolhidos = document.querySelector('#elemento-numeros-escolhidos');
const elementoMensagemAlerta = document.querySelector('#elemento-mensagem-alerta');

function sortear() {
    let tipoEscolhido = parseInt(document.querySelector('#tipo-escolhido').value);
    let numeroMinimo = parseInt(document.querySelector('#numero-minimo').value);
    let numeroMaximo = parseInt(document.querySelector('#numero-maximo').value);
    let quantidade = parseInt(document.querySelector('#quantidade').value);

    let listaNumerosSorteados = [];
    let numeroAleatorio;

    if (!validarCampos(numeroMinimo, numeroMaximo, quantidade, tipoEscolhido)) return;

    for (let i = numeroMinimo; i <= quantidade; i++) {
        numeroAleatorio = obterNumeroSorteado(numeroMinimo, numeroMaximo);

        while (listaNumerosSorteados.includes(numeroAleatorio) || !verificarOperacaoEscolhida(numeroAleatorio, tipoEscolhido)) {
            numeroAleatorio = obterNumeroSorteado(numeroMinimo, numeroMaximo);
        }

        listaNumerosSorteados.push(numeroAleatorio);
    }

    listaNumerosSorteados.sort(compararNumerosOrdemCrescente);
    let mensagemNumerosSorteados = `Números sorteados: ${listaNumerosSorteados.join(', ')}`;
    exibirMensagemAlerta('sucesso', 'verde', mensagemNumerosSorteados);
    exibirTodosNumerosNaTela(numeroMinimo, numeroMaximo, listaNumerosSorteados);

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function verificarOperacaoEscolhida(numeroAleatorio, tipoEscolhido) {
    if (tipoEscolhido == 2) {
        return numeroAleatorio % 2 == 0;
    }

    if (tipoEscolhido == 3) {
        return numeroAleatorio % 2 !== 0;
    }

    return true;
}

function validarCampos(numeroMinimo, numeroMaximo, quantidade, tipoEscolhido) {
    limparCampo();

    let calculoNumeroLimite = numeroMaximo / 2;

    if (tipoEscolhido != 1 && quantidade > calculoNumeroLimite) {
        exibirMensagemAlerta('alerta', 'vermelho', `A quantidade deve ser igual a ${calculoNumeroLimite}`);
        return false;
    }
    
    if (isNaN(numeroMinimo) || isNaN(numeroMaximo) || isNaN(quantidade)) {
        exibirMensagemAlerta('alerta', 'vermelho', `Preencha corretamente todos os campos`);
        return false;
    }

    if (quantidade > (numeroMaximo - numeroMinimo + 1)) {
        exibirMensagemAlerta('alerta', 'vermelho', `A quantidade máxima permitida é ${numeroMaximo}`);
        return false;
    }

    return true;
}

function exibirTodosNumerosNaTela(numeroMinimo, numeroMaximo, listaNumerosSorteados) {
    elementoNumerosEscolhidos.innerHTML = '';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        let verificarCorNumero = listaNumerosSorteados.includes(i) ? 'verde' : 'vermelho';

        elementoNumerosEscolhidos.innerHTML += `
            <span class="conteudo__caixa modelo__cor-${verificarCorNumero}" id="numero-sorteado-${i}">
                ${i}
            <span/>
        `;
    }
}

function exibirMensagemPadraoNaTela() {
    elementoNumerosEscolhidos.innerHTML = `
        <p class="conteudo__texto">
            <span class="conteudo__destaque">Aguardando sorteio de números.</span>
        </p>
    `;
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    exibirMensagemPadraoNaTela();
    elementoMensagemAlerta.innerHTML = '';
}

function limparCampo() {
    document.querySelector('#numero-minimo').value = '';
    document.querySelector('#numero-maximo').value = '';
    document.querySelector('#quantidade').value = '';
}

function compararNumerosOrdemCrescente(numeroInicial, numeroFinal) {
    return numeroInicial - numeroFinal;
}

function exibirMensagemAlerta(tipo, cor, texto) {
    exibirMensagemPadraoNaTela();
    
    elementoMensagemAlerta.innerHTML = `
        <span class="conteudo__mensagem conteudo__mensagem--${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function obterNumeroSorteado(numeroMinimo, numeroMaximo) {
    return parseInt(Math.random() * (numeroMaximo - numeroMinimo + 1) + numeroMinimo);
}

exibirMensagemPadraoNaTela();