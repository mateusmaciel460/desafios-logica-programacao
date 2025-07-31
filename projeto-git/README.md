# Projeto Git e Github

Segue a lista de comandos básicos de git.

## Iniciando um projeto git e github
|Comando|Explicação|
|-------|----------|
|**git config --global user.name "usuario"**|define o usuário git da máquina|
|**git config --global user.email "nome@email.com"**|define o email git da máquina|
|**git init**|inicializa um projeto git|
|**git add . ou git add index.html**|adiciona um arquivo para commit|
|**git commit -m "mensagem"**|adiciona comentário em arquivo alterado|
|**git remote add**|adiciona projeto remoto (Github/Gitlab)|

## Colaborando em um projeto git
|Comando|Explicação|
|-------|----------|
|**git clone**|Clona/Copia um repositório remoto|
|**git status**|Verifica se um arquivo foi modificado ou adicionado em commit|
|**git log**|Verifica o histório de commits|
|**git remote -v**|verifica os repositórios remotos do projeto|
|**git push**|envia alterações para o repositório remoto|
|**git pull**|pega todas as modificações presentes no remoto|

## Voltando na linha do tempo
|Comando|Explicação|
|-------|----------|
|**git revert ID**|Desfaz as mudanças de um commit x, reescrevendo um novo commit de substituição|
|**git reset --hard ID**|Desfaz todos os commits feitos depois desse ID x|
|**git commit --amend -m "atualização"**|altera a mensagem de commit (última)|

# Recursos adicionais

- README.md
- .gitignore (/pasta, arquivo.text, *.js, */js)
- Gist

> Atenciosamente, @mateusmaciel460
