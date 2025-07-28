let contadorJogos = 0;

const elementoContadorJogos = document.querySelector('#elemento-contador-jogos');
const elementoJogos = document.querySelector('#elemento-jogos');
const listaJogos = [
    { id: 1, titulo: 'Grand Theft Auto', img: 'LX2kNw4h/gta-five.png' },
    { id: 2, titulo: 'Elden Ring', img: 'C39Sj4fv/elden-ring.png' },
    { id: 3, titulo: 'God of War Ragnarök', img: 'h1LTYnCJ/god-of-war.png' }
];

function alugar(jogoSelecionado) {
    let jogo = elementoJogos.querySelector(`#jogo-${jogoSelecionado}`);

    let jogoBotao = jogo.querySelector('button');
    let jogoImagem = jogo.querySelector('img');
    let jogoTag = jogo.querySelector('span');

    if (jogoBotao.classList.contains('modelo__cor-azul')) {
        jogoImagem.classList.add('conteudo__imagem-opacidade');

        jogoBotao.classList.remove('modelo__cor-azul');
        jogoBotao.classList.add('modelo__cor-cinza');

        jogoTag.classList.remove('modelo__cor-verde');
        jogoTag.classList.add('modelo__cor-vermelha');

        jogoTag.textContent = 'Alugado';

        jogoBotao.textContent = 'Devolver';
        contadorJogos++;
    } else {
        if (!validaDevolucao(jogoImagem)) return;

        jogoImagem.classList.remove('conteudo__imagem-opacidade');

        jogoBotao.classList.remove('modelo__cor-cinza');
        jogoBotao.classList.add('modelo__cor-azul');

        jogoTag.classList.remove('modelo__cor-vermelha');
        jogoTag.classList.add('modelo__cor-verde');

        jogoTag.textContent = 'Ninguém alugou';

        jogoBotao.textContent = 'Alugar';
        contadorJogos--;
    }

    elementoContadorJogos.textContent = contadorJogos;
}

function validaDevolucao(tituloJogo) {
    let nomeGame = tituloJogo.title;
    let mensagemPergunta = parseInt(prompt('Digite o número 1 para devolver o jogo ' + nomeGame));

    let verificarDevolucao = mensagemPergunta != 1 ? 'não' : 'sim';
    let mensagemAviso = `Você escolheu (${verificarDevolucao}) para devolver o jogo ${nomeGame}.`;

    if (mensagemPergunta != 1) {
        alert(mensagemAviso);
        return false;
    } else {
        alert(mensagemAviso);
        return true;
    }
}

function exibirJogosNaTela() {
    listaJogos.forEach((jogo) => {
        elementoJogos.innerHTML += `
            <div class="jogo modelo__vertical modelo__centralizado" id="jogo-${jogo.id}">
                <img src="https://i.ibb.co/${jogo.img}" alt="Logo - ${jogo.titulo}" class="conteudo__imagem" title="${jogo.titulo}"/>

                <h2 class="conteudo__subtitulo">${mostrarTituloEncurtado(jogo.titulo)}</h2>
                <span class="conteudo__texto conteudo__tag modelo__cor-verde">Ninguém alugou</span>

                <button onclick="alugar(${jogo.id})" class="conteudo__botao modelo__cor-azul">Alugar</button>
            </div>
        `;
    });
}

function mostrarTituloEncurtado(titulo) {
    return titulo.substr(0, 12).concat('...');
}

exibirJogosNaTela();