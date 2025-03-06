<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste para Programador Jr em PHP Procedural</title>
    <!-- Font Aewsome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- Css -->
    <link rel="stylesheet" href="src/css/style.css">
    <!-- jQuery -->
    <script src="src/js/jquery-3.7.1.min.js"></script>
    <!-- Js -->
    <script src="src/js/app.js"></script>
</head>

<body>

    <!-- Overlay para escurecer o fundo -->
    <div id="overlay" class="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        style="display: none; opacity: 0.5; z-index: 1040;"></div>

    <!-- Este é o seu elemento de carregamento (loading) -->
    <div id="loading" class="position-fixed top-0 start-0 w-100 h-100 bg-dark text-white"
    style="display: none; opacity: 0.5; z-index: 1040;">
        <p>Carregando...</p> <!-- Você pode substituir por um gif ou animação -->
    </div>

    <!-- Cabeçalho -->
    <header class="bg-dark p-2 text-white d-flex align-items-center">
        <img src="src/img/logo.png" alt="logo_app" id="logo" class="me-2" style="height: 40px;">
        <h2 class="mb-0">Gerenciador de tarefas</h2>
    </header>

    <!-- Sessão de busca -->
    <section id="search" class="mt-5">
        <div class="container mb-3">
            <form action="#" method="post" id="search_form">
                <div class="row align-items-center">
                    <div class="col">
                        <input type="text" name="search_input" id="search_input" class="form-control"
                            placeholder="Pesquisar">
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary">
                            <i class="fa-solid fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <!-- Botão que adiciona uma nova tarefa e listar tarefas -->
    <section id="new_task">
        <div class="container mt-4">
            <div class="row">
                <div class="col-auto">
                    <button class="btn btn-secondary" id="new_task_btn">
                        Nova tarefa
                    </button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-secondary" id="task_list">
                        Listar tarefas
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Pop-up adicionar tarefas -->
    <section id="task_popup" class="position-fixed top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded-3 w-100"
        style="display: none; max-width: 500px; z-index: 1050;">
        <div class="container">
            <h2 class="mb-4 text-center">Adicionar Tarefa</h2>
            <form id="task_form">
                <div class="mb-3">
                    <label for="task_name" class="form-label">Nome da Tarefa</label>
                    <input type="text" class="form-control" id="task_name" required minlength="5">
                </div>
                <div class="mb-3">
                    <label for="task_stats" class="form-label">Status</label>
                    <select name="task_stats" id="task_stats" class="form-control">
                        <option value="in_progress">Em andamento</option>
                        <option value="pending">Pendente</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="task_description" class="form-label">Descrição da Tarefa</label>
                    <textarea class="form-control" id="task_description" name="task_description" rows="3" required minlength="10"
                        style="resize:none"></textarea>
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Salvar</button>
                    <button type="button" id="close_popup" class="btn btn-secondary">Fechar</button>
                </div>
            </form>
        </div>
    </section>

    <!-- Pop-up editar tarefas -->
    <section id="edit_task_popup" class="position-fixed top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded-3 w-100"
        style="display: none; max-width: 500px; z-index: 1050;">
        <div class="container">
            <h2 class="mb-4 text-center">Editar Tarefa</h2>
            <form id="edit_task_form">
                <div class="mb-3">
                    <label for="task_name" class="form-label">Nome da Tarefa</label>
                    <input type="text" class="form-control" id="task_name" required minlength="5">
                </div>
                <div class="mb-3">
                    <label for="task_stats" class="form-label">Status</label>
                    <select name="task_stats" id="task_stats" class="form-control">
                        <option value="in_progress">Em andamento</option>
                        <option value="pending">Pendente</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="task_description" class="form-label">Descrição da Tarefa</label>
                    <textarea class="form-control" id="task_description" name="task_description" rows="3" required minlength="10"
                        style="resize:none"></textarea>
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Salvar</button>
                    <button type="button" id="close_popup" class="btn btn-secondary">Fechar</button>
                </div>
            </form>
        </div>
    </section>

    <section id="tasks" class="container mt-5">
        
    </section>

    <!-- Bootstrap for more functionality  -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>
</html>