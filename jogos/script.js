let elementoJogosAlugados = document.querySelector('#elemento-jogos-alugados');
let contadorJogos = 0;

let listaJogos = [
    { id: 1, titulo: 'Call of Duty', caminhoImagem: 'https://i.ibb.co/DgpJFmCK/call-of-duty-2.png' },
    { id: 2, titulo: 'Grand Theft Auto', caminhoImagem: 'https://i.ibb.co/99XJrtjz/grand-theft-auto.png' },
    { id: 3, titulo: 'Fifa 22', caminhoImagem: 'https://i.ibb.co/chYZXscB/fifa-22.png' }
];

function alugar(id) {
    let jogo = document.querySelector(`#jogo-${id}`);
    let botao = jogo.querySelector('button');
    let imagem = jogo.querySelector('img');
    let titulo = jogo.querySelector('h3').textContent;

    let ultimaClasseBotao = botao.classList[botao.classList.length - 1];

    if (ultimaClasseBotao == 'conteudo__botao--azul') {
        botao.classList.remove('conteudo__botao--azul');
        botao.classList.add('conteudo__botao--cinza');

        imagem.classList.add('conteudo__imagem--opacidade');

        botao.textContent = 'Devolver';
        contadorJogos++;
    } else {
        if (!validacaoDevolucao(titulo)) return;

        botao.classList.remove('conteudo__botao--cinza');
        botao.classList.add('conteudo__botao--azul');

        imagem.classList.remove('conteudo__imagem--opacidade');

        botao.textContent = 'Alugar';
        contadorJogos--;
    }

    elementoJogosAlugados.textContent = contadorJogos;
    modificarEtiquetaJogo(jogo, imagem);
}

function validacaoDevolucao(titulo) {
    let mensagem = prompt(`Digite o nome do jogo (${titulo}) para sim`);
    let permissao = mensagem != titulo ? 'não' : 'sim';
    let frasePadrao = `Você respondeu (${permissao}) para devolver o ${titulo}`;

    if (mensagem != titulo) {
        alert(frasePadrao);
        return false;
    } else {
        alert(frasePadrao);
    }

    return true;
}

function exibirListagemJogos() {
    let elementoListagemJogo = document.querySelector('#elemento-listagem-jogo');
    let elementoJogo;

    listaJogos.forEach((jogo) => {
        elementoListagemJogo.innerHTML += `
            <div class="conteudo__camada modelo__vertical modelo__centralizado" id="jogo-${jogo.id}">
                <img src="${jogo.caminhoImagem}" alt="Jogo - ${jogo.caminhoImagem}" class="conteudo__imagem"/>
                <h3 class="conteudo__subtitulo-2">${jogo.titulo}</h3>
                <span class="conteudo__etiqueta conteudo__vermelho">Não alugado</span>
                <button onclick="alugar(${jogo.id})" class="conteudo__botao aaa conteudo__botao--azul">Alugar</button>
            </div>
        `;
    });
}

function modificarEtiquetaJogo(jogoEscolhido, imagemJogo) {
    listaJogos.forEach((jogo) => {
        let etiquetaJogo = jogoEscolhido.querySelector('span');

        if (imagemJogo.classList[imagemJogo.classList.length - 1] == 'conteudo__imagem--opacidade') {
            etiquetaJogo.textContent = 'Alugado';
            etiquetaJogo.classList.remove('conteudo__vermelho');
            etiquetaJogo.classList.add('conteudo__verde');
        } else {
            etiquetaJogo.textContent = 'Não alugado';
            etiquetaJogo.classList.remove('conteudo__verde');
            etiquetaJogo.classList.add('conteudo__vermelho');
        }
    });
}

exibirListagemJogos();