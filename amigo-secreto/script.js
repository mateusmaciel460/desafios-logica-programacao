const elementoAmigoAdicionado = document.querySelector('#elemento-amigo-adicionado');
const elementoAmigoSorteado = document.querySelector('#elemento-amigo-sorteado');
const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');

let listaDeAmigosAdicionados = [];

function adicionar() {
    const nomeAmigo = document.querySelector('#nome-amigo').value;

    if (!validaCampo(nomeAmigo)) return;

    inserirNovoAmigo(nomeAmigo);
}

function inserirNovoAmigo(nomeAmigo) {
    listaDeAmigosAdicionados.push(nomeAmigo);

    if (listaDeAmigosAdicionados.length > 3) {
        document.querySelector('#botao-sortear').removeAttribute('disabled');
    }

    elementoAmigoAdicionado.innerHTML = `
        <p class="conteudo__mensagens modelo__cor-verde conteudo__tag">
            ${listaDeAmigosAdicionados.join(', ')}
        </p>
    `;
}

function validaCampo(nomeAmigo) {
    document.querySelector('#nome-amigo').value = '';
    elementoMensagemAviso.innerHTML = '';   

    const nomeAmigoMinusculo = nomeAmigo.toLowerCase();
    const listaNomesEmMinusculo = listaDeAmigosAdicionados.join(',').toLowerCase();

    if (nomeAmigo == '') {
        exibirMensagemAviso('alerta', 'vermelha', 'Preencha o campo nome do amigo');
        return false;
    }

    if (listaNomesEmMinusculo.includes(nomeAmigoMinusculo)) {
        exibirMensagemAviso('alerta', 'vermelha', `Já existe um amigo com as caracteres ${nomeAmigo}`);
        return false;
    }

    return true;
}

function sortear() {
    elementoAmigoSorteado.innerHTML = '';
    elementoMensagemAviso.innerHTML = '';
    misturarItensDaLista(listaDeAmigosAdicionados);

    for (let i = 0; i < listaDeAmigosAdicionados.length; i++) {
        if (i == (listaDeAmigosAdicionados.length - 1)) {
            exibirRelacaoAmigoSorteado(i, 0);
        } else {
            exibirRelacaoAmigoSorteado(i, i + 1);
        }
    }

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function reiniciar() {
    exibirMensagemInicialNaTela();
    elementoMensagemAviso.innerHTML = '';
    listaDeAmigosAdicionados = [];

    document.querySelector('#botao-sortear').setAttribute('disabled', true);
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
}

function exibirRelacaoAmigoSorteado(primeiraRegra, segundaRegra) {
    elementoAmigoSorteado.innerHTML += `
        <p class="conteudo__mensagens modelo__cor-verde conteudo__tag">
            ${listaDeAmigosAdicionados[primeiraRegra]} -> ${listaDeAmigosAdicionados[segundaRegra]}
        </p>
    `;
}

function misturarItensDaLista(lista) {
    return lista.sort(() => Math.random() - 0.5);
}

function exibirMensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function exibirMensagemInicial(elemento, tipo) {
    elemento.innerHTML = `
        <p class="conteudo__mensagens modelo__cor-vermelha conteudo__tag">
            Nenhum amigo foi ${tipo} até o momento.
        </p>
    `;
}

function exibirMensagemInicialNaTela() {
    exibirMensagemInicial(elementoAmigoAdicionado, 'adicionado');
    exibirMensagemInicial(elementoAmigoSorteado, 'sorteado');
}

exibirMensagemInicialNaTela();