# test_project

Projeto base, que servirá como molde para futuros projetos da OTMA.
## Configurações
### Ambiente Virtual
  
A criação do VirtualEnv é feita dentro do próprio PyCharm. O menu de criação fica em ```File > Settings > Project: text_project > Project Interpreter```. Dentro da janela de edição do ambiente virtual, clique no menu de opções, ao lado do select de ```Project Interpreter```. A opção de adicionar criará uma nova janela, onde será selecionada a opção ```New environment``` com as seguintes configurações:
 - Location: aqui fica a localização do seu venv. Deve ser em uma pasta vazia;
 - Base interpreter: essa é a versão do Python que será utilizada, no caso, ```python3.7```;

### Instalação das dependências
  As dependências estão listadas no arquivo requirements, que fica na pasta conf
    
    - django
    - django-bower
    - psycopg2-binary
    - https://github.com/otmasolucoes/apps.core.authentication/zipball/master
    - https://github.com/otmasolucoes/apps.core.security/zipball/master
    - https://github.com/otmasolucoes/apps.entities/zipball/master
    
    
  Para instalar as mesmas, o comando ```pip install -r conf/requirements.txt --process-dependency-links``` deverá ser executado
    
### Instalação das bibliotecas de terceiros

Nos nossos projetos, não são incluídos arquivos de outros repositórios. Para usá-los, nós usamos o bower, que faz a instalação dos pacotes na pasta ```static\bower_components``` e nos permite importar com facilidade sem criar um excesso de arquivos no nosso próprio repositório.

Para instalar o bower, é necessário o Node e o npm.
  Node.js & npm: https://nodejs.org/en/download/
Depois de instalar o npm, no terminal ou no cmd, execute a linha:
  
 ```sudo npm install bower -g```
  
![Install Bower](https://i.imgur.com/2coZ8lI.gif)
  
  
OBS¹: A configuração dos scripts será tratada abaixo.

### Scripts

A execução do programa será dada pelo PyCharm. Ele executará linhas de código que serão como atalhos para o Terminal. Para criar um comando de execução, vá na parte de 

![Add configuration](https://i.imgur.com/nQFMlQO.jpg)

#### runserver
- No campo "Name" digite ```runserver```
- No campo "Script" digite o caminho para o arquivo ```manage.py```
- No campo "Script parameters" digite ```runserver 8000```

#### makemigrations
- No campo "Name" digite ```makemigrations```
- No campo "Script" digite o caminho para o arquivo ```manage.py```
- No campo "Script parameters" digite ```makemigrations```
  

#### migrate
- No campo "Name" digite ```migrate```
- No campo "Script" digite o caminho para o arquivo ```manage.py```
- No campo "Script parameters" digite ```migrate```

#### bower install
- No campo "Name" digite ```bower install```
- No campo "Script" digite o caminho para o arquivo ```manage.py```
- No campo "Script parameters" digite ```bower install```
    

### Extra
Leitura recomendada sobre GIT e Politicas de Versionamento:

  - https://git-scm.com/book/pt-br/v1/Ramifica%C3%A7%C3%A3o-Branching-no-Git-B%C3%A1sico-de-Branch-e-Merge

  - https://git-scm.com/book/pt-br/v1/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Branches-Remotos


