let elementoNumerosSorteados = document.querySelector('#elemento-numeros-sorteados');
let elementoMensagemErro = document.querySelector('#elemento-mensagem-erro');

function sortear() {
    let numeroMinimo = document.querySelector('#numero-minimo').value;
    let numeroMaximo = document.querySelector('#numero-maximo').value;
    let quantidade = document.querySelector('#quantidade').value;

    elementoMensagemErro.innerHTML = '';

    let diferenca = numeroMaximo - numeroMinimo + 1;

    // Validação
    if ((numeroMinimo && numeroMaximo && quantidade) == '') {
        exibirMensagemErro('Preencha todos os campos');
        return;
    }

    if ((quantidade > diferenca) || (quantidade <= 0)) {
        document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
        exibirMensagemErro(`A quantidade deve ser entre ${numeroMinimo} e ${numeroMaximo}.`);
        return;
    }

    let listaNumeros = [];
    let numeroAleatorio;

    for (let contador = 0; contador < quantidade; contador++) {
        numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);

        while (listaNumeros.includes(numeroAleatorio)) {
            numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
        }

        listaNumeros.push(numeroAleatorio);
    }

    elementoNumerosSorteados.textContent = `Números sorteados: ${listaNumeros.join(', ')}`;

    document.querySelector('#quantidade').value = '';
    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function reiniciar() {
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
        <span class="conteudo__mensagem--alerta">
            ${conteudo}
        </span>
    `;
}