let listaCadeirasReservadasPorPessoa = [];
let listaCompradores = [];

let elementoCadeirasDisponiveis = document.querySelector('#elemento-cadeiras-disponiveis');
let elementoPrecoCompra = document.querySelector('#elemento-preco-compra');
let elementoPrecoIngresso = document.querySelector('#elemento-preco-ingresso');
let elementoLugaresReservados = document.querySelector('#elemento-lugares-reservados');
let elementoCompradores = document.querySelector('#elemento-compradores');

let precoIngresso = 23;
let precoCompra = 0;
let quantidadeAssentos = 22;
let quantidadeCadeirasReservadas = 0;

function reservarCadeira(numeracao) {
    let cadeiraReservada = document.querySelector(`#cadeira-${numeracao}`);
    let classeCadeiraReservada = cadeiraReservada.classList;

    // Modificando as cores das poltronas
    classeCadeiraReservada.remove('conteudo__vermelho');
    classeCadeiraReservada.add('conteudo__verde');
    cadeiraReservada.removeAttribute('onclick');

    // Adicionando cadeiras reservadas
    listaCadeirasReservadasPorPessoa.push(numeracao);
    let totalCadeirasReservadas = listaCadeirasReservadasPorPessoa.length;

    // Mostrar valores
    precoCompra += precoIngresso;
    elementoPrecoCompra.textContent = `${precoCompra} (${totalCadeirasReservadas}x)`;

    // Mostrar lugares reservados
    elementoLugaresReservados.textContent = `${listaCadeirasReservadasPorPessoa.join(', ')}`;

    document.querySelector('#botao-compra').removeAttribute('disabled');
}

function comprar() {
    let nomeComprador = document.querySelector('#nome').value;
    let lugaresComprador = listaCadeirasReservadasPorPessoa;
    let totalCadeirasReservadas = listaCadeirasReservadasPorPessoa.length;
    let cadeiraEspecifica;

    listaCompradores.push({ 
        nome: nomeComprador, lugares: lugaresComprador, quantidade: totalCadeirasReservadas
    });

    exibirCompradoresNaTela(nomeComprador, lugaresComprador, totalCadeirasReservadas);

    listaCadeirasReservadasPorPessoa.forEach((reservada) => {
        cadeiraEspecifica = document.querySelector(`#cadeira-${reservada}`);

        cadeiraEspecifica.classList.remove('conteudo__verde');
        cadeiraEspecifica.classList.add('conteudo__cinza');
        cadeiraEspecifica.removeAttribute('onclick');
        cadeiraEspecifica.title = nomeComprador;
    });

    resetarPersonalidadesDaTela();
    quantidadeCadeirasReservadas += totalCadeirasReservadas;
    aparecerReiniciar();
}

function resetarPersonalidadesDaTela() {
    elementoPrecoCompra.textContent = 0;
    elementoLugaresReservados.textContent = 'Nenhum';
    document.querySelector('#nome').value = '';
    listaCadeirasReservadasPorPessoa = [];
    precoCompra = 0;
}

function exibirCompradoresNaTela(comprador, lugares, quantidadeLugares) {
    elementoCompradores.innerHTML += `
        <p class="conteudo__texto borda__superior">
            Comprador: <span class="conteudo__destaque">${comprador}</span> |
            Lugares: <span class="conteudo__destaque">${lugares.join(', ')}</span> |
            Quantidade: <span class="conteudo__destaque">${quantidadeLugares}</span>
        </p>
    `;
}

function exibirCadeirasDisponiveisNaTela() {
    for (let contador = 1; contador <= quantidadeAssentos; contador++) {
        elementoCadeirasDisponiveis.innerHTML += `
            <div class="cadeiras__disponiveis conteudo__bloco conteudo__texto conteudo__vermelho" id="cadeira-${contador}" onclick="reservarCadeira(${contador})">
                    0${contador}
            </div>
        `;
    }

    elementoPrecoIngresso.textContent = precoIngresso;
}

function aparecerReiniciar() {
    if (quantidadeAssentos == quantidadeCadeirasReservadas) {
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    }

    console.log(quantidadeAssentos, quantidadeCadeirasReservadas);
}

exibirCadeirasDisponiveisNaTela();