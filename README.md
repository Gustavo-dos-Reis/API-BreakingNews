# Projeto de Gerenciamento de Postagens e Usuários

## Descrição
Este projeto é uma aplicação baseada em Node.js e Express.js, que fornece funcionalidades para gerenciar usuários e postagens, incluindo autenticação, criação de posts, atualização de dados de usuários e interações em postagens. A aplicação utiliza MongoDB para persistência de dados e JWT para autenticação segura.

## Estrutura do Projeto
O projeto está dividido em módulos para garantir uma estrutura limpa e organizada:

### Pastas e Arquivos Principais

- **controllers/**: Contém os controladores que recebem as requisições HTTP e chamam os serviços correspondentes para executar a lógica de negócio.
  - `auth.controller.js`
  - `post.controller.js`
  - `user.controller.js`

- **services/**: Implementação da lógica de negócio da aplicação.
  - `auth.service.js`
  - `post.service.js`
  - `user.service.js`

- **repositories/**: Camada de acesso aos dados que se comunica diretamente com os modelos do banco de dados.
  - `auth.repositories.js`
  - `post.repositories.js`
  - `user.repositories.js`

- **middlewares/**: Middleware de autenticação e verificação de IDs.
  - `auth.middlewares.js`
  - `global.middlewares.js`

- **models/**: Modelos Mongoose que definem a estrutura dos documentos no banco de dados.
  - `Post.js`
  - `User.js`

- **routes/**: Define as rotas da aplicação e conecta os controladores.
  - `auth.route.js`
  - `post.route.js`
  - `user.route.js`
  - `swagger.route.js` (documentação da API)

- **database/**: Arquivo de conexão com o MongoDB.
  - `database.js`

- **Configurações do Servidor**
  - `app.js`: Configura a aplicação Express e aplica middlewares globais.
  - `server.js`: Inicia o servidor na porta especificada.

## Funcionalidades
- **Autenticação JWT**: Login seguro com geração de token.
- **Gestão de Usuários**: Criação, atualização e busca de usuários.
- **Criação e Gerenciamento de Postagens**: Criação, atualização, busca e exclusão de postagens.
- **Interação com Postagens**: Curtir, comentar e remover comentários em postagens.

## Tecnologias Utilizadas
- **Node.js**: Plataforma de desenvolvimento.
- **Express.js**: Framework de aplicações web.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: ODM para interação com MongoDB.
- **JWT (JSON Web Token)**: Autenticação de usuários.
- **bcrypt**: Hash de senhas para armazenamento seguro.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **Swagger**: Documentação da API.

## Como Executar o Projeto
1. Clone o repositório:
   ```bash
   git clone <URL-do-repositorio>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   PORT=3001
   MONGODB_URI=<sua-uri-mongodb>
   SECRET_JWT=<sua-chave-secreta>
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Documentação da API
Acesse a documentação Swagger da API em:
```
http://localhost:3001/doc
```

## Contribuição
Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

---

Este projeto foi desenvolvido para facilitar o gerenciamento de postagens e usuários, oferecendo uma API robusta e segura.

