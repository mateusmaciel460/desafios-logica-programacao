let elementoNumerosSorteados = document.querySelector('#elemento-numeros-sorteados');
let elementoNumerosPossiveis = document.querySelector('#elemento-numeros-possiveis');
let elementoMensagemErro = document.querySelector('#elemento-mensagem-erro');
let listaNumerosSelecionados = [];

function validacaoCampos(numeroMinimo, numeroMaximo, quantidade, diferenca) {
    if (isNaN(numeroMinimo && numeroMaximo && quantidade)) {
        exibirMensagemErro('Preencha corretamente todos os campos');
        return false;
    }

    if ((numeroMaximo <= numeroMinimo)) {
        exibirMensagemErro(`O número máximo deve ser maior ou igual a ${numeroMaximo + 1}`);
        return false;
    }

    if ((quantidade > diferenca) || (quantidade <= 0)) {
        document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
        exibirMensagemErro(`A quantidade deve ser entre ${numeroMinimo} e ${numeroMaximo}.`);
        return false;
    }
    return true;
}

function sortear() {
    let numeroMinimo = parseInt(document.querySelector('#numero-minimo').value);
    let numeroMaximo = parseInt(document.querySelector('#numero-maximo').value);
    let quantidade = parseInt(document.querySelector('#quantidade').value);
    let padraoEscolhido = parseInt(document.querySelector('#padrao-escolhido').value);

    elementoMensagemErro.innerHTML = '';

    let diferenca = numeroMaximo - numeroMinimo + 1;
    let quantidadeLimiteNumerosRegra = parseInt(diferenca / 2);

    if (!validacaoCampos(numeroMinimo, numeroMaximo, quantidade, diferenca)) return;

    listaNumerosSelecionados = [];
    let listaNumeros = [];
    let numeroAleatorio = 0;

    for (let contador = 0; contador < quantidade; contador++) {
        numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);

        while (listaNumeros.includes(numeroAleatorio) || regra(numeroAleatorio, padraoEscolhido, quantidade, diferenca)) {
            numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
        }

        if (quantidade > (quantidadeLimiteNumerosRegra) && padraoEscolhido != 0) {
            exibirMensagemErro(`A quantidade deve ser igual ou menor que ${quantidadeLimiteNumerosRegra}.`);
            return;
        }

        listaNumeros.push(numeroAleatorio);
        listaNumerosSelecionados.push(numeroAleatorio);
    }

    elementoNumerosSorteados.textContent = `Números sorteados: ${listaNumeros.join(', ')}`;

    document.querySelector('#quantidade').value = '';
    document.querySelector('#botao-reiniciar').removeAttribute('disabled');

    exibirNumerosPossiveis(numeroMaximo);
}

function regra(numeroAleatorio, padraoEscolhido, quantidade, diferenca) {
    let numeroPar = numeroAleatorio % 2 == 0;
    let numeroImpar = numeroAleatorio % 2 != 0;

    let listaRegra = [true, numeroPar, numeroImpar];

    for (let contador = 0; contador < listaRegra.length; contador++) {
        if ((contador) == padraoEscolhido) {
            return !(listaRegra[padraoEscolhido]);
        }
    }
}

function reiniciar() {
    exibirNumerosPossiveis();
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    document.querySelector('#numero-minimo').value = '';
    document.querySelector('#numero-maximo').value = '';
    document.querySelector('#quantidade').value = '';

    elementoNumerosSorteados.textContent = 'Nenhum número foi sorteado :(';
}

function obterNumeroAleatorio(numeroMinimo, numeroMaximo) {
    numeroMinimo = Math.ceil(numeroMinimo);
    numeroMaximo = Math.floor(numeroMaximo);

    return parseInt(Math.random() * (numeroMaximo - numeroMinimo + 1) + numeroMinimo);
}

function exibirMensagemErro(conteudo) {
    elementoMensagemErro.innerHTML += `
        <span class="conteudo__mensagem--alerta conteudo__mensagem-rotacao">
            ${conteudo}
        </span>
    `;
}

function exibirNumerosPossiveis(numeroMaximo) {
    elementoNumerosPossiveis.innerHTML = '';
    let verificarSeNumeroFoiSorteado;

    for (let contador = 0; contador < numeroMaximo; contador++) {
        verificarSeNumeroFoiSorteado = listaNumerosSelecionados.includes(contador + 1);

        elementoNumerosPossiveis.innerHTML += `
            <div class="conteudo__bloco conteudo__texto ${verificarSeNumeroFoiSorteado ? 'conteudo__verde' : 'conteudo__vermelho'}">
                ${contador + 1}
            </div>`;
    }
}