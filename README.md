# SimuQuestion

SimuQuestion é um aplicativo interativo de estudo e prática de perguntas e respostas, desenvolvido com foco em fins acadêmicos. Ele permite que usuários estudem diversos temas, acompanhem suas pontuações e gerenciem provas e perguntas. O aplicativo inclui funcionalidades como login, registro, seleção de temas, visualização de perguntas e um sistema de pontuação para monitorar o progresso.

## 📚 Introdução

SimuQuestion é especialmente útil para estudantes e professores, oferecendo uma plataforma amigável para a criação e visualização de perguntas em diferentes temas. A interface intuitiva facilita a navegação, tornando o estudo mais acessível e envolvente.

## 🔑 Recursos Principais

- **Cadastro e Login:** Autenticação segura para que os usuários acessem suas perguntas e pontuações.
- **Seleção de Temas:** Permite que os usuários escolham diferentes áreas de estudo para praticar.
- **Sistema de Pontuação:** Ajuda a monitorar o desempenho e progresso do usuário.
- **Gerenciamento de Provas e Perguntas:** Facilita a criação e organização de conteúdo para estudo.

## 🛠️ Tecnologias Utilizadas

O projeto é desenvolvido utilizando as seguintes tecnologias:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

## ☁️ Backend

O backend do projeto foi desenvolvido separadamente em **Python** e hospedado na **AWS**. Atualmente, ele foi **desligado**, portanto funcionalidades que dependem da API, como login real, registro e envio de perguntas, não estão operacionais.

Para fins de visualização e testes da interface, é possível **burlar a autenticação** manualmente. Uma forma de fazer isso é:

- Abrir o arquivo `App.js`
- Procurar pela variável `logado` (ou similar)
- Trocar seu valor de `false` para `true`

Com isso, o aplicativo vai carregar a página inicial normalmente, permitindo a navegação pelas telas e visualização do sistema mesmo sem o backend ativo.

## 🚀 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/RobertoSantos98/SimuQuestion.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd SimuQuestion
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o aplicativo:
   ```bash
   npm start
   ```

Certifique-se de ter o [Expo Go](https://expo.dev/client) instalado em seu dispositivo móvel para testar o aplicativo.

## 📁 Estrutura do Projeto

O projeto possui a seguinte estrutura de diretórios:

- `/assets`: Contém imagens e outros recursos estáticos.
- `/src`: Contém os arquivos de código-fonte do aplicativo.
- `App.js`: Arquivo principal que inicializa o aplicativo.
- `package.json`: Gerencia as dependências e scripts do projeto.

## 📄 Licença

Este projeto é para fins acadêmicos.

## 👨‍💻 Autor

Desenvolvido por [Roberto Santos](https://github.com/RobertoSantos98).

Você pode comentar e me dar dicas de como melhorar na publicação do [linkedin] que fiz para esse APP: (https://www.linkedin.com/posts/robertosantos98_desenvolvimento-frontend-frontenddevelopment-activity-7259940733439119361-j1HR?utm_source=share&utm_medium=member_desktop&rcm=ACoAACcIWvgBDXfquJcTBQBqWA0NPWSwMEAMOfM)

