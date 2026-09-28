🌎 GSAM Maricá
Acolher • Integrar • Conectar • Empreender

O GSAM Maricá é uma proposta de plataforma digital desenvolvida para valorizar pessoas migrantes e refugiadas que empreendem em Maricá, promovendo visibilidade, conexão e oportunidades.

A ideia é transformar uma página institucional em uma plataforma que permita apresentar empreendedores, produtos e serviços, aproximando a comunidade e fortalecendo o empreendedorismo.

Uma proposta social transformada em uma aplicação Full Stack.

🎯 Objetivo do projeto

Criar uma plataforma digital que possa:

apresentar o trabalho do GSAM Maricá;
divulgar empreendedores e seus negócios;
apresentar produtos e serviços;
facilitar a conexão entre empreendedores e clientes;
valorizar a diversidade cultural;
criar novas possibilidades de integração e oportunidades.

Este projeto foi desenvolvido como uma proposta prática durante o curso de Desenvolvimento Full Stack da Toti, em 2026.

💡 A proposta

O projeto começou como uma ideia para aplicar os conhecimentos aprendidos no curso em uma situação próxima da realidade.

Em vez de desenvolver apenas uma página estática, a proposta foi evoluir o projeto para uma aplicação conectada a uma API REST e banco de dados, permitindo trabalhar com informações de empreendedores e produtos.

Da ideia à aplicação
Ideia
  ↓
UX/UI
  ↓
Frontend
  ↓
API REST
  ↓
Backend
  ↓
Banco de dados
  ↓
Aplicação Full Stack
🖥️ Tecnologias utilizadas
Frontend
React
TypeScript
Vite
JavaScript
HTML5
CSS3
Fetch API
Componentização
Responsividade
Backend
Node.js
Express
API REST
Sequelize
SQLite
CORS
📁 Estrutura do projeto
maricagsam/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── database.sqlite
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
⚙️ Funcionalidades
👥 Empreendedores
Listagem de empreendedores
Nome e nacionalidade
Descrição do trabalho
Telefone para contato
Foto de perfil
Cadastro de novos empreendedores
🛍️ Produtos e serviços
Listagem de produtos e serviços
Categoria
Descrição
Preço
Foto
Telefone para contato
Associação com o empreendedor
Cadastro de novos produtos ou serviços
🔐 Usuários
Cadastro de usuário
Login
Persistência da sessão no navegador
Mensagem de usuário conectado
Logout
📱 Interface
Layout responsivo
Navegação por seções
Cards de empreendedores
Cards de produtos e serviços
Área de contato
Identidade visual própria do GSAM Maricá
🔗 API REST

O frontend se comunica com o backend por meio de uma API REST.

Principais endpoints:

GET  /empreendedores
POST /empreendedores
PUT  /empreendedores/:id

GET  /produtos
POST /produtos
DELETE /produtos/:id

A API é responsável por receber, consultar, cadastrar, atualizar e excluir dados utilizados pela aplicação.

🗄️ Banco de dados

O projeto utiliza SQLite como banco de dados e Sequelize como ORM.

As principais entidades são:

Empreendedor
     │
     │ 1:N
     ↓
Produto

Um empreendedor pode possuir vários produtos ou serviços.

🧪 Testes realizados

Durante o desenvolvimento foram realizados testes de:

carregamento da aplicação;
conexão entre frontend e backend;
consulta da API;
carregamento dos empreendedores;
carregamento dos produtos;
cadastro de empreendedor;
cadastro de produto;
associação entre empreendedor e produto;
exibição de imagens;
navegação pelas seções;
login e cadastro de usuário;
logout.
🚀 Como executar o projeto
Backend

Entre na pasta:

cd backend

Instale as dependências:

npm install

Execute:

npm run dev

A API ficará disponível em:

http://localhost:3000
Frontend

Em outro terminal:

cd frontend

Instale as dependências:

npm install

Execute:

npm run dev

O Vite exibirá o endereço local da aplicação.

🌱 Possíveis evoluções

O projeto pode continuar evoluindo com novas funcionalidades, como:

autenticação completa;
perfil individual do empreendedor;
busca e filtros;
upload de imagens;
painel administrativo;
mapa de empreendedores;
categorias de produtos e serviços;
favoritos;
avaliações;
integração com serviços externos.

Essas funcionalidades representam possibilidades futuras da proposta e não necessariamente fazem parte da versão atual.

👩‍💻 Sobre o desenvolvimento

Este projeto foi desenvolvido por Carolina Flores durante sua formação em Desenvolvimento Full Stack na Toti, em 2026.

A proposta une conhecimentos de UX/UI, desenvolvimento Front-End, Back-End, API REST e banco de dados, transformando uma ideia de impacto social em uma aplicação web funcional.

🤝 Propósito

O GSAM Maricá representa uma proposta de tecnologia voltada para pessoas e comunidade.

Acolher. Integrar. Conectar. Empreender.