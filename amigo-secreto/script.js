let amigosAdicionados = [];

let elementoAmigosAdicionados = document.querySelector('#elemento-amigos-adicionados');
let elementoAmigosSorteados = document.querySelector('#elemento-amigos-sorteados');
let mensagemErro = document.querySelector('#mensagem-erro');

function adicionar() {
    let nomeAmigo = document.querySelector('#nome-amigo').value;

    let amigosAdicionadosMinusculo = amigosAdicionados.join(',').toLowerCase();
    let nomeAmigoMinusculo = nomeAmigo.toLowerCase();

    mensagemErro.innerHTML = '';

    if (nomeAmigo == '') {
        mensagemAviso(mensagemErro, 'Preencha o campo do amigo secreto.');
        return;
    }

    if (amigosAdicionadosMinusculo.includes(nomeAmigoMinusculo)) {
        mensagemAviso(mensagemErro, `O amigo secreto ${nomeAmigo} já foi adicionado.`);
        return;
    }

    amigosAdicionados.push(nomeAmigo);

    if (amigosAdicionados.length >= 4) {
        document.querySelector('#botao-sortear').removeAttribute('disabled');
    }

    elementoAmigosAdicionados.textContent = `${amigosAdicionados.join(', ')}`;

    document.querySelector('#nome-amigo').value = '';
}

function reiniciar() {
    amigosAdicionados = [];
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    document.querySelector('#botao-sortear').setAttribute('disabled', true);
    mensagemPadrao();
}

function sortear() {
    elementoAmigosSorteados.innerHTML = '';
    misturarLista(amigosAdicionados);

    for (let i = 0; i < amigosAdicionados.length; i++) {
        if (i == amigosAdicionados.length - 1) {
            elementoAmigosSorteados.innerHTML += `
                ${amigosAdicionados[i]} -> ${amigosAdicionados[0]} </br>`;
        } else {
            elementoAmigosSorteados.innerHTML += `
            ${amigosAdicionados[i]} -> ${amigosAdicionados[i + 1]} </br>`;
        }
    }

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function misturarLista(lista) {
    lista.sort(() => Math.random() - 0.5);
}

function mensagemAviso(elemento, conteudo) {
    elemento.innerHTML += `
        <span class="conteudo__mensagem--alerta">${conteudo}</span>
    `;
}

function mensagemPadrao() {
    let mensagem = `<div class="conteudo__mensagem modelo__vertical">
        <span class="conteudo__mensagem--alerta">
            Nenhum amigo adicionado :(
        </span>
    </div>`;

    elementoAmigosAdicionados.innerHTML = mensagem;
    elementoAmigosSorteados.innerHTML = mensagem;
}

mensagemPadrao();