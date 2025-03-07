<?php

require_once('../inc/db.php');

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $source = $_GET['source'] ?? '';

        // Verifica se o parâmetro 'source' é 'search'
        if ($source === 'search') {
            // Valida e sanitiza a entrada de pesquisa
            $search_input = isset($_GET['search']) ? trim($_GET['search']) : '';

            if (empty($search_input)) {
                echo json_encode(["success" => false, "message" => "O campo de busca está vazio."]);
                exit;
            }

            // Prepara a query SQL para busca
            $sql = "SELECT * FROM task WHERE task_name LIKE ? OR task_description LIKE ? ORDER BY id DESC";
            $stmt = mysqli_prepare($connection, $sql);

            if ($stmt) {
                // Adiciona os '%' para a busca parcial
                $search_param = "%{$search_input}%";

                // Associa os parâmetros à query
                mysqli_stmt_bind_param($stmt, "ss", $search_param, $search_param);

                // Executa a query
                if (mysqli_stmt_execute($stmt)) {
                    $result = mysqli_stmt_get_result($stmt);
                    $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);

                    if ($tasks) {
                        echo json_encode(["success" => true, "tasks" => $tasks]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Nenhuma tarefa encontrada."]);
                    }
                } else {
                    echo json_encode(["success" => false, "message" => "Erro na execução da query."]);
                }

                // Fecha o statement
                mysqli_stmt_close($stmt);
            } else {
                // Exibe o erro de forma genérica para o usuário
                echo json_encode(["success" => false, "message" => "Erro ao preparar a query: " . mysqli_error($connection)]);
            }
        } else {
            // Caso não haja o parâmetro 'source' ou não seja 'search', executa a consulta normal
            $sql = "SELECT * FROM task ORDER BY id DESC";
            $result = mysqli_query($connection, $sql);

            if ($result && mysqli_num_rows($result) > 0) {
                $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);
                echo json_encode(["success" => true, "tasks" => $tasks]);
            } else {
                echo json_encode(["success" => false, "message" => "Nenhuma tarefa encontrada."]);
            }
        }

        break;
    case 'POST':
        // Lê o corpo da requisição e decodifica o JSON
        $data = json_decode(file_get_contents('php://input'), true);

        // Extrai os dados do JSON
        $name = $data['task_name'] ?? '';
        $status = $data['task_stats'] ?? '';
        $description = $data['task_description'] ?? '';

        // Array para armazenar erros
        $errors = [];

        // Validações
        if (empty($name)) {
            $errors[] = "Nome da tarefa inválido";
        }

        if (empty($description)) {
            $errors[] = "Descrição inválida";
        }

        // Se não houver erros, insere no banco de dados
        if (empty($errors)) {
            // Prepara a query SQL
            $sql = "INSERT INTO task (task_name, task_description, task_stats) VALUES (?, ?, ?)";
            $stmt = mysqli_prepare($connection, $sql);

            if ($stmt) {
                // Associa os parâmetros à query
                mysqli_stmt_bind_param($stmt, "sss", $name, $description, $status);

                // Executa a query
                if (mysqli_stmt_execute($stmt)) {
                    // Resposta de sucesso
                    echo json_encode(["success" => true, "message" => "Tarefa criada com sucesso!"]);
                } else {
                    // Resposta de erro na execução
                    echo json_encode(["success" => false, "message" => "Erro ao criar a tarefa: " . mysqli_error($connection)]);
                }

                // Fecha o statement
                mysqli_stmt_close($stmt);
            } else {
                // Resposta de erro na preparação da query
                echo json_encode(["success" => false, "message" => "Erro ao preparar a query: " . mysqli_error($connection)]);
            }
        } else {
            // Resposta com erros de validação
            echo json_encode(["success" => false, "message" => "Erros de validação:", "errors" => $errors]);
        }
        break;
    case 'PUT':
        // Lê o corpo da requisição e decodifica o JSON
        $data = json_decode(file_get_contents('php://input'), true);

        // Extrai os dados do JSON
        $id = $data['task_id'] ?? '';
        $name = $data['task_name'] ?? '';
        $description = $data['task_description'] ?? '';
        $stats = $data['task_stats'] ?? '';

        // Array para armazenar erros
        $errors = [];

        // Validações
        if (empty($id)) {
            $errors[] = "ID da tarefa inválido";
        }

        if (empty($name)) {
            $errors[] = "Nome da tarefa inválido";
        }

        if (empty($description)) {
            $errors[] = "Descrição inválida";
        }

        // Se não houver erros, atualiza no banco de dados
        if (empty($errors)) {
            // Prepara a query SQL
            $sql = "UPDATE task SET task_name=?, task_description=?, task_stats=? WHERE id=?";
            $stmt = mysqli_prepare($connection, $sql);

            if ($stmt) {
                // Associa os parâmetros à query
                mysqli_stmt_bind_param($stmt, "sssi", $name, $description, $stats, $id);

                // Executa a query
                if (mysqli_stmt_execute($stmt)) {
                    // Resposta de sucesso
                    echo json_encode(["success" => true, "message" => "Tarefa atualizada com sucesso!"]);
                } else {
                    // Resposta de erro na execução
                    echo json_encode(["success" => false, "message" => "Erro ao atualizar a tarefa: " . mysqli_error($connection)]);
                }

                // Fecha o statement
                mysqli_stmt_close($stmt);
            } else {
                // Resposta de erro na preparação da query
                echo json_encode(["success" => false, "message" => "Erro ao preparar a query: " . mysqli_error($connection)]);
            }
        } else {
            // Resposta com erros de validação
            echo json_encode(["success" => false, "message" => "Erros de validação:", "errors" => $errors]);
        }
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);

        $id = $data['task_id'] ?? '';

        $errors = [];

        if (empty($id)) {
            $errors[] = "ID da tarefa inválido.";
        }

        if (empty($errors)) {
            // Prepara a query SQL
            $sql = "DELETE FROM task WHERE id=?";
            $stmt = mysqli_prepare($connection, $sql);

            if ($stmt) {
                // Associa os parâmetros à query
                mysqli_stmt_bind_param($stmt, "i", $id);

                // Executa a query
                if (mysqli_stmt_execute($stmt)) {
                    // Resposta de sucesso
                    echo json_encode(["success" => true, "message" => "Tarefa removida com sucesso!"]);
                } else {
                    // Resposta de erro na execução
                    echo json_encode(["success" => false, "message" => "Erro ao remover a tarefa: " . mysqli_error($connection)]);
                }

                // Fecha o statement
                mysqli_stmt_close($stmt);
            } else {
                // Resposta de erro na preparação da query
                echo json_encode(["success" => false, "message" => "Erro ao preparar a query: " . mysqli_error($connection)]);
            }
        } else {
            // Resposta com erros de validação
            echo json_encode(["success" => false, "message" => "Erros de validação:", "errors" => $errors]);
        }
        break;
    default:
        echo json_encode(["message" => "Método não permitido."]);
        break;
}
