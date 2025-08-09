const elementoQuantidadeJogosAlugados = document.querySelector('#elemento-quantidade-jogos-alugados');
const elementoJogos = document.querySelector('#jogos');

const listaJogos = [
    { id: 1, titulo: 'Grand Theft Auto V', img: 'LX2kNw4h/gta-five.png' },
    { id: 2, titulo: 'Elden Ring', img: 'C39Sj4fv/elden-ring.png' },
    { id: 3, titulo: 'God of War Ragnarök', img: 'h1LTYnCJ/god-of-war.png' }
];

let quantidadeJogosAlugados = 0;

function alugar(jogoEscolhido) {
    const jogo = elementoJogos.querySelector(`#jogo-${jogoEscolhido}`);

    let jogoImagem = jogo.querySelector('img');
    let jogoImagemTitulo = jogoImagem.title;
    let jogoImagemClasse = jogoImagem.classList;
    
    let jogoTag = jogo.querySelector('span');
    let jogoTagClasse = jogoTag.classList;

    let jogoBotao = jogo.querySelector('button');
    let jogoBotaoClasse = jogoBotao.classList;

    if (jogoBotaoClasse.contains('modelo__cor-azul')) {
        jogoImagemClasse.add('conteudo__imagem-opacidade');

        jogoTag.textContent = 'Alugado';

        jogoTagClasse.remove('modelo__cor-verde');
        jogoTagClasse.add('modelo__cor-vermelha');
        
        jogoBotao.textContent = 'Devolver';

        jogoBotaoClasse.remove('modelo__cor-azul');
        jogoBotaoClasse.add('modelo__cor-cinza');

        quantidadeJogosAlugados++;
    } else {

        if (!validarDevolucao(jogoImagemTitulo)) return;

        jogoImagemClasse.remove('conteudo__imagem-opacidade');

        jogoTag.textContent = 'Ninguém alugou';

        jogoTagClasse.remove('modelo__cor-vermelha');
        jogoTagClasse.add('modelo__cor-verde');

        jogoBotao.textContent = 'Alugar';

        jogoBotaoClasse.remove('modelo__cor-cinza');
        jogoBotaoClasse.add('modelo__cor-azul');

        quantidadeJogosAlugados--;
    }

    elementoQuantidadeJogosAlugados.textContent = quantidadeJogosAlugados;
}

function validarDevolucao(tituloJogo) {
    let mensagem = parseInt(prompt(`Digite 1 para devolver o jogo ${tituloJogo}.`));
    let verificarDevolucao = mensagem !== 1 ? 'não' : 'sim';
    let mensagemFinal = `Você escolheu a opção (${verificarDevolucao}) para devolver ${tituloJogo}.`;

    alert(mensagemFinal);

    if (mensagem === 1) {
        return true;
    } else {
        return false;
    }
}

function exibirListaJogosNaTela() {
    listaJogos.forEach((jogo) => {
        elementoJogos.innerHTML += `
            <div class="jogo modelo__vertical modelo__centralizado" id="jogo-${jogo.id}">
                <img src="https://i.ibb.co/${jogo.img}" alt="Logo do jogo (${jogo.titulo})" class="conteudo__imagem" title="${jogo.titulo}"/>
                <h2 class="conteudo__subtitulo">
                    ${encurtarTitulo(jogo.titulo)}
                </h2>
                <span class="conteudo__tag modelo__cor-verde">
                    Ninguém alugou
                </span>

                <button onclick="alugar(${jogo.id})" class="conteudo__botao modelo__cor-azul">
                    Alugar
                </button>
            </div>
        `;
    });
}

function encurtarTitulo(titulo) {
    let caracterLimite = 12;
    let tituloCurto = titulo.substr(0, caracterLimite);

    if (titulo.length > 12) {
        titulo = tituloCurto.concat('...');
    }

    return titulo;
}

exibirListaJogosNaTela();