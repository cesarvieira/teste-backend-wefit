## 🔌 Teste Backend - WeFit

**API RESTful** para processar dados de cadastro recebidos de um formulário.

---

### ⚙️ Pré-requisitos

Para rodar a API, você precisará ter o seguinte instalado:

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

### 🛠️ Configuração do Ambiente

1. Faça uma cópia do arquivo `.env.example` e renomeie para `.env`:

   ```bash
   cp .env.example .env
    ```

2. Atualize as variáveis de ambiente no arquivo .env conforme necessário.

### 🛢️ Iniciando o Banco de Dados

1. Verifique se você tem o *Docker* e o *Docker Compose* instalados.
2. Para iniciar o banco de dados MySQL, execute o seguinte comando na raiz do projeto:

  ```bash
  docker-compose up -D
  ```

Isso irá criar um container MySQL acessível em `localhost:3306`. 

### 🔄 Executando as Migrações

Antes de iniciar o servidor, é necessário criar as tabelas no banco de dados. Para isso, execute:

```bash
npm run migrate
```

Esse comando aplicará todas as migrações necessárias para preparar o banco de dados.

### 🚀 Iniciando o Servidor

Após rodar as migrações, você pode iniciar o servidor com:
    
```bash
npm start
```

Agora, o servidor Express estará rodando e pronto para receber requisições.

### 🧪 Testando a API

Para testar a API, você pode utilizar o [Postman](https://www.postman.com/) ou qualquer outra ferramenta de sua preferência.

### 📄 Documentação da API

A documentação da API foi feita utilizando o Swagger. Para acessá-la, basta acessar o endpoint `/api-docs`.

### 🌐 Tecnologias Utilizadas

![Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![Badge](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Badge](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Badge](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Badge](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Badge](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Badge](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
