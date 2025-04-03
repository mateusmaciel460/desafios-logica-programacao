let elementoProjetos = document.querySelector('#elemento-projetos');
const listaProjetos = [
    { id: 1, titulo: 'Projeto base', caminho: 'projeto-base' },
    { id: 2, titulo: 'Número secreto', caminho: 'numero-secreto' },
    { id: 3, titulo: 'Sorteador de números', caminho: 'sorteador-numeros' },
    { id: 4, titulo: 'Jogos', caminho: 'jogos' },
    { id: 5, titulo: 'Carrinho de compras', caminho: 'carrinho-compras' },
    { id: 6, titulo: 'Cine - entrada', caminho: 'cine-entrada' },
    { id: 7, titulo: 'Amigo secreto', caminho: 'amigo-secreto' },
];

listaProjetos.forEach((projeto) => {
    elementoProjetos.innerHTML += `
        <a 
            href="${projeto.caminho}/" 
            target="_blank" class="conteudo__texto">${projeto.titulo}</a>
    `;
});