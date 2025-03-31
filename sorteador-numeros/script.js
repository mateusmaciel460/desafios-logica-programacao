let elementoMensagemErro = document.querySelector('#elemento-mensagem-erro');
let elementoNumeroSorteado = document.querySelector('#elemento-numero-sorteado');

function sortear() {
    let numeroMinimo = document.querySelector('#numero-minimo').value;
    let numeroMaximo = document.querySelector('#numero-maximo').value;
    let quantidade = document.querySelector('#quantidade').value;

    let listaNumeros = [];
    let numeroSorteado;
    let diferenca = numeroMaximo - numeroMinimo + 1;

    // Validação
    elementoMensagemErro.innerHTML = '';
    if (quantidade > diferenca) {
        exibirMensagemErro(`A quantidade deve igual ou menor que ${diferenca}`);
        return;
    }

    if ((numeroMinimo && numeroMaximo && quantidade) == '') {
        exibirMensagemErro('Preencha todos os campos.');
        return;
    }

    for (let i = 0; i < quantidade; i++) {
        numeroSorteado = obterNumeroAleatorio(numeroMinimo, numeroMaximo);

        while (listaNumeros.includes(numeroSorteado)) {
            numeroSorteado = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
        }

        listaNumeros.push(numeroSorteado);
    }

    elementoNumeroSorteado.textContent = 
        `Números sorteados ${listaNumeros.join(', ')}`;

    document.querySelector('#quantidade').value = '';
    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function exibirMensagemErro(conteudo) {
    elementoMensagemErro.innerHTML += `
        <span class="conteudo__mensagem--alerta">${conteudo}</span>
    `;
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    document.querySelector('#numero-minimo').value = '';
    document.querySelector('#numero-maximo').value = '';
    document.querySelector('#quantidade').value = '';

    elementoMensagemErro.innerHTML = '';
    elementoNumeroSorteado.textContent = 'Números sorteados: nenhum até agora';
}

function obterNumeroAleatorio(minimo, maximo) {
    minimo = Math.floor(minimo);
    maximo = Math.ceil(maximo);

    return parseInt(Math.random() * (maximo - minimo + 1) + minimo);
}