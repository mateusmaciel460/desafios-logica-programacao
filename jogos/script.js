let elementoContador = document.querySelector('#elemento-contador');
let contadorJogosAlugados = 0;

function alugar(id) {
    let jogo = document.querySelector(`#jogo-${id}`);
    let titulo = jogo.querySelector('h3');
    let imagem = jogo.querySelector('img');
    let botao = jogo.querySelector('button');

    let classeBotao = botao.classList;
    let classeImagem = imagem.classList;

    if (classeBotao[1] == 'conteudo__botao--azul') {
        classeBotao.remove('conteudo__botao--azul');
        classeBotao.add('conteudo__botao--cinza');
        classeImagem.add('conteudo__imagem--opacidade');
        botao.textContent = 'Devolver';
        contadorJogosAlugados++;
    } else {
        // Validação
        let mensagem = prompt('Tem certeza que deseja devolver? (1 para sim)');
        let validacaoMensagem = mensagem != 1 ? 'não' : 'sim';
        let textoPadrao = `Você respondeu (${validacaoMensagem}) para devolver o jogo [${titulo.textContent}]`
        
        if (mensagem != 1) {
            alert(textoPadrao);
            return;
        } else {
            alert(textoPadrao);
        }

        classeBotao.remove('conteudo__botao--cinza');
        classeBotao.add('conteudo__botao--azul');
        classeImagem.remove('conteudo__imagem--opacidade');
        botao.textContent = 'Alugar';
        contadorJogosAlugados--;
    }

    elementoContador.textContent = `Quantidade de jogos alugados: ${contadorJogosAlugados}`;
}