const elementoCadeiraReservada = document.querySelector('#elemento-cadeira-reservada');
const elementoPrecoIngresso = document.querySelector('#elemento-preco-ingresso');
const elementoPrecoCompra = document.querySelector('#elemento-preco-compra');
const elementoAssentoEscolhido = document.querySelector('#elemento-assento-escolhido');
const elementoIngressoComprado = document.querySelector('#elemento-ingresso-comprado');
const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');

let precoIngresso = 21;
let precoGeral = 0;
let totalCadeiras = 16;

let listaCadeirasEscolhidas = [];
let listaCompradores = [];
let listaCadeirasReservadas = [];

function resetarPadraoEscolha(cadeiraEscolhida, modeloRemovido, modeloAdicionado, chamadaAtual) {
    const elementoCadeiraEscolhida = document.querySelector(`#elemento-cadeira-${cadeiraEscolhida}`);

    elementoCadeiraEscolhida.classList.remove(modeloRemovido);
    elementoCadeiraEscolhida.classList.add(modeloAdicionado);

    elementoCadeiraEscolhida.setAttribute('onclick', `${chamadaAtual}(${cadeiraEscolhida})`);
    elementoAssentoEscolhido.textContent = "Assentos: " + listaCadeirasEscolhidas.join(', ');

    elementoPrecoCompra.textContent = precoGeral;

    if (listaCadeirasEscolhidas.length === 0) {
        elementoAssentoEscolhido.textContent = 'Nenhum assento escolhido.';
    }
}

function escolherCadeira(cadeiraEscolhida) {
    listaCadeirasEscolhidas.push(cadeiraEscolhida);
    listaCadeirasReservadas.push(cadeiraEscolhida);

    precoGeral += precoIngresso;
    resetarPadraoEscolha(cadeiraEscolhida, 'modelo__cor-vermelha', 'modelo__cor-verde', 'cancelarCadeiraEscolhida');
}

function cancelarCadeiraEscolhida(cadeiraEscolhida) {
    const numeroASerRemovido = listaCadeirasEscolhidas.indexOf(cadeiraEscolhida);

    if (numeroASerRemovido != -1) {
        listaCadeirasEscolhidas.splice(numeroASerRemovido, 1);
    }

    precoGeral -= precoIngresso;
    resetarPadraoEscolha(cadeiraEscolhida, 'modelo__cor-verde', 'modelo__cor-vermelha', 'escolherCadeira');
}

function comprarIngresso() {
    const nomeComprador = document.querySelector('#nome').value;

    if (!validaCampo(nomeComprador, listaCadeirasEscolhidas)) return;

    listaCompradores.push({ comprador: nomeComprador, cadeirasReservadas: listaCadeirasEscolhidas });

    precoGeral = 0;
    elementoPrecoCompra.textContent = 0;
    elementoIngressoComprado.innerHTML = '';

    listaCompradores.forEach((compra) => {
        elementoIngressoComprado.innerHTML += `
            <div class="conteudo__caixa">
                <p class="conteudo__texto">
                    Nome: <span class="conteudo__destaque">${compra.comprador}</span>
                    | Assento(s): ${compra.cadeirasReservadas.join(', ')}
                </p>
            </div>
        `;
    });

    listaCadeirasEscolhidas = [];
    exibirElementosIniciaisNaTela();
    adicionarCadeirasEmReserva();
}

function validaCampo(nomeComprador, listaCadeirasEscolhidas) {
    elementoMensagemAviso.innerHTML = '';

    if (nomeComprador == '') {
        exibirMensagemAviso('alerta', 'vermelha', 'Preencha o campo nome');
        return false;
    }

    if (listaCadeirasEscolhidas.length == 0) {
        exibirMensagemAviso('alerta', 'vermelha', 'Nenhum assento foi escolhido, limite mínimo: 1');
        return false;
    }

    document.querySelector('#nome').value = '';

    return true;
}

function exibirMensagemAviso(tipo, cor, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__${tipo} modelo__cor-${cor}">
            ${texto}.
        </span>
    `;
}

function adicionarCadeirasEmReserva() {
    let cadeiraEscolhida;

    listaCadeirasReservadas.forEach((cadeira) => {
        cadeiraEscolhida = document.querySelector(`#elemento-cadeira-${cadeira}`);
        cadeiraEscolhida.removeAttribute('onclick');
    });
}

function exibirElementosIniciaisNaTela() {
    elementoCadeiraReservada.innerHTML = '';

    let verificarStatusCorCadeira;

    for (let i = 1; i <= totalCadeiras; i++) {
        verificarStatusCorCadeira = listaCadeirasReservadas.includes(i) ? 'cinza' : 'vermelha';

        elementoCadeiraReservada.innerHTML += `
            <div class="conteudo__caixa modelo__cor-${verificarStatusCorCadeira}" id="elemento-cadeira-${i}" onclick="escolherCadeira(${i})">
                0${i}
            </div>
        `;
    }

    if (listaCadeirasReservadas.length == totalCadeiras) {
        document.querySelector('#botao-adicionar').setAttribute('disabled', true);
    }

    elementoPrecoIngresso.textContent = precoIngresso;
    elementoAssentoEscolhido.textContent = 'Nenhum assento escolhido.';
}

exibirElementosIniciaisNaTela();