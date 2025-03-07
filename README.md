
# Gerenciador de Tarefas com PHP e AJAX

Um sistema simples de gerenciamento de tarefas utilizando PHP como API e AJAX para interações assíncronas.

## 📋 Funcionalidades

- Adicionar, editar, concluir e excluir tarefas.
- Status das tarefas: `completed`, `in_progress`, `pending`.
- Interface responsiva utilizando Bootstrap.
- Comunicação assíncrona com a API via AJAX.

## 📂 Estrutura do Projeto

```
📦 task-manager
├── 📂 src
│    ├── 📂 views
│    │      ├── index.php
│    │      └── tasks.php
│    ├── 📂 api
│    │      ├── addTask.php
│    │      ├── editTask.php
│    │      ├── deleteTask.php
│    │      └── getTasks.php
│    └── 📂 assets
│           ├── style.css
│           └── script.js
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
   git clone https://github.com/seu-usuario/task-manager.git
   cd task-manager
   ```

2. **Configure o Laragon:**
   - Baixe e instale o [Laragon](https://laragon.org/).
   - Inicie o Laragon e mova a pasta `task-manager` para `C:\laragon\www`.
   - Acesse: `http://localhost/task-manager` no navegador.

3. **Crie o banco de dados:**
   - Acesse `http://localhost/phpmyadmin`.
   - Crie um banco de dados chamado `task_manager`.
   - Execute o script abaixo:

   ```sql
   CREATE DATABASE task_manager;
   USE task_manager;

   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       task_name VARCHAR(255) NOT NULL,
       task_description TEXT,
       task_status ENUM('completed', 'in_progress', 'pending') DEFAULT 'pending'
   );
   ```

4. **Acesse o projeto no navegador:**
   ```
   http://localhost/task-manager
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

## 🤝 Contribuindo

1. Faça um fork do projeto.
2. Crie um branch: `git checkout -b feature/minha-feature`.
3. Commit suas alterações: `git commit -m 'Minha nova feature'`.
4. Envie para o branch principal: `git push origin feature/minha-feature`.

## 📄 Licença

Este projeto está sob a licença MIT.
