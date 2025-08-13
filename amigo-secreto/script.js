const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoAmigoAdicionado = document.querySelector('#elemento-amigo-adicionado');
const elementoAmigoSorteado = document.querySelector('#elemento-amigo-sorteado');

let listaAmigosAdicionados = [];

function adicionarAmigo() {
    let nomeAmigo = document.querySelector('#nome-amigo').value;

    if (!validarCampo(nomeAmigo)) return;

    inserirAmigoNaLista(nomeAmigo);
}

function inserirAmigoNaLista(nomeAmigo) {
    listaAmigosAdicionados.push(nomeAmigo);

    if (listaAmigosAdicionados.length > 3) {
        document.querySelector('#botao-sortear').removeAttribute('disabled');
    }

    exibirMensagemNaTela(
        elementoAmigoAdicionado, 
        `${listaAmigosAdicionados.join(', ')}`,
        'verde', 1
    );
}

function sortear() {
    elementoMensagemAviso.innerHTML = '';
    elementoAmigoSorteado.innerHTML = '';
    misturarLista(listaAmigosAdicionados);

    for (let i = 0; i < listaAmigosAdicionados.length; i++) {
        if (i == (listaAmigosAdicionados.length - 1)) {
            exibirMensagemNaTela(
                elementoAmigoSorteado, 
                `${listaAmigosAdicionados[i]} -> ${listaAmigosAdicionados[0]}`,
                'verde', 2
            );
        } else {
            exibirMensagemNaTela(
                elementoAmigoSorteado, 
                `${listaAmigosAdicionados[i]} -> ${listaAmigosAdicionados[i + 1]}`,
                'verde', 2
            );
        }
    }

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function reiniciar() {
    document.querySelector('#botao-sortear').setAttribute('disabled', true);
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
    exibirMensagemInicialNaTela();
    listaAmigosAdicionados = [];
}

function misturarLista(lista) {
    return lista.sort(() => Math.random() - 0.5);
}

function validarCampo(nomeAmigo) {
    document.querySelector('#nome-amigo').value = '';
    elementoMensagemAviso.innerHTML = '';

    let nomeAmigoMinusculo = nomeAmigo.toLowerCase();
    let listaAmigoMinusculo = listaAmigosAdicionados.join(', ').toLowerCase();

    if (nomeAmigo == '') {
        exibirMensagemAviso('alerta', 'vermelha', 'Preencha o campo (nome do amigo)');
        return false;
    }

    if (listaAmigoMinusculo.includes(nomeAmigoMinusculo)) {
        exibirMensagemAviso('alerta', 'vermelha', `Já existe um amigo com as caracteres ${nomeAmigo}, escolha outro`);
        return false;
    }

    return true;
}

function exibirMensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function exibirMensagemNaTela(elementoEscolhido, mensagem, cor, identificador) {
    if (identificador === 1) {
        elementoEscolhido.innerHTML = `
            <span class="conteudo__texto conteudo__mensagem modelo__cor-${cor}">
                ${mensagem}.
            </span>
        `;
    }  
    
    if (identificador === 2) {
        elementoEscolhido.innerHTML += `
            <span class="conteudo__texto conteudo__mensagem modelo__cor-${cor}">
                ${mensagem}.
            </span>
        `;
    }
}

function exibirMensagemInicialNaTela() {
    exibirMensagemNaTela(
        elementoAmigoAdicionado, 
        'Nenhum amigo adicionado até o momento',
        'vermelha', 1
    );

    exibirMensagemNaTela(
        elementoAmigoSorteado, 
        'Nenhum amigo sorteado até o momento',
        'vermelha', 1
    );
}

exibirMensagemInicialNaTela();