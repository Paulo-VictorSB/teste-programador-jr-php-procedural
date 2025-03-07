# Gerenciador de Tarefas com PHP e AJAX

Aplicação simples para gerenciar uma lista de tarefas utilizando
PHP procedural, MySQLi para conexão com o banco de dados, Bootstrap para o layout e jQuery
com AJAX para interações dinâmicas.

## 📋 Funcionalidades

- Adicionar, editar, concluir e excluir tarefas.
- Status das tarefas: `completed`, `in_progress`, `pending`.
- Interface responsiva utilizando Bootstrap.
- Comunicação assíncrona com a API via AJAX.

## 📂 Estrutura do Projeto

```
📦 teste-programador-jr-php-procedural
├── 📂 backend 
│    ├── 📂 inc
│    │      ├── database.sql
│    │      └── db.php
│    ├── 📂 routes
│    │      └── task_routes.php
│    └── 📄 index.php     
│         
├── 📂 frontend       
│    ├── 📂 src
│    │      ├── 📂 css
|    |      |      └── styles.css
│    │      ├── 📂 img
|    |      |      ├── logo.ico
|    |      |      └── logo.png
|    │      └── 📂 js
|    |             ├── app.js
|    |             └── jquery-3.7.1.min.js
|    └── 📄 index.html
|
└── 📄 index.php
└── 📄 README.md
```

## 🛠️ Pré-requisitos

- PHP 8.0 ou superior
- MySQL/MariaDB
- Laragon (para ambiente local)
- Navegador atualizado

## 📥 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Paulo-VictorSB/teste-programador-jr-php-procedural.git
   ```

2. **Configure o Laragon:**
   - Baixe e instale o Laragon [Laragon](https://www.mediafire.com/file/k0w1ovdkea4bbr7laragon-wamp+(2).exe/file).
   - Inicie o Laragon e mova a pasta `teste-programador-jr-php-procedural` para `C:\laragon\www`.
   - Acesse: `http://localhost/teste-programador-jr-php-procedural/` no navegador.

3. **Importe o banco de dados:**
   - Abra o laragon.
   - Inicie o servidor. 
   - entre na aba de `banco de dados`.
   - Execute o script abaixo:
   - Ele vai iniciar a interface HEIDISQL 
   - Crie um nome da sessão `localhost`
   - usuario: root | senha: ''.
   - Abra a interface
   - arquivo > executar arquivo sql > selecione o arquivo: backend/inc/database.sql
   - Já vai ter alguns dados teste.

4. **Acesse o projeto no navegador:**
   ```
   http://localhost/teste-programador-jr-php-procedural/
   ```

## 🚀 Utilização

1. Adicione uma nova tarefa.
2. Edite ou exclua tarefas já cadastradas.
3. Altere o status de cada tarefa.

## 🧰 Tecnologias Utilizadas

- PHP (API)
- MySQL (Banco de Dados)
- AJAX (Interatividade assíncrona)
- Bootstrap (Estilização)

## 📄 Licença

Este projeto está sob a licença MIT.
