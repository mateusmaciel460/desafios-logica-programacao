let elementoJogosAlugados = document.querySelector('#elemento-jogos-alugados');
let contadorJogos = 0;

function alugar(id) {
    let jogo = document.querySelector(`#jogo-${id}`);
    let botao = jogo.querySelector('button');
    let imagem = jogo.querySelector('img');

    if (botao.classList[1] == 'conteudo__botao--azul') {
        botao.classList.remove('conteudo__botao--azul');
        botao.classList.add('conteudo__botao--cinza');

        imagem.classList.add('conteudo__imagem--opacidade');

        botao.textContent = 'Devolver';
        contadorJogos++;
    } else {

        // (permissão)
        let titulo = jogo.querySelector('h3').textContent;

        let mensagem = parseInt(prompt(`Você deseja devolver o ${titulo}? (1 para sim) `));
        let permissao = mensagem != 1 ? 'não' : 'sim';
        let frasePadrao = `Você respondeu (${permissao}) para devolver o ${titulo}`;

        if (mensagem != 1) {
            alert(frasePadrao);
            return;
        } else {
            alert(frasePadrao);
        }

        botao.classList.remove('conteudo__botao--cinza');
        botao.classList.add('conteudo__botao--azul');

        imagem.classList.remove('conteudo__imagem--opacidade');

        botao.textContent = 'Alugar';
        contadorJogos--;
    }

    elementoJogosAlugados.textContent = `Quantidade de jogos alugados: ${contadorJogos}`;
}