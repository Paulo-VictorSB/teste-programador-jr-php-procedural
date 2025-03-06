<?php

require_once('../inc/db.php');

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM task";
        $result = mysqli_query($connection, $sql);

        if(mysqli_num_rows($result) > 0) {
            $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($tasks);
        } else {
            echo json_encode(["message" => "Nenhuma tarefa encontrada."]);
        }
        break;
    case 'POST':
        // Lê o corpo da requisição e decodifica o JSON
        $data = json_decode(file_get_contents('php://input'), true);

        // Extrai os dados do JSON
        $name = $data['name'] ?? '';
        $description = $data['description'] ?? '';
        $status = $data['status'] ?? '';

        // Array para armazenar erros
        $errors = [];

        // Validações
        if (empty($name)) {
            $errors[] = "Nome da tarefa inválido.";
        }

        if (empty($description)) {
            $errors[] = "Descrição inválida.";
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
        $status = $data['task_stats'] ?? '';
    
        // Array para armazenar erros
        $errors = [];
    
        // Validações
        if (empty($id)) {
            $errors[] = "ID da tarefa inválido.";
        }
    
        if (empty($name)) {
            $errors[] = "Nome da tarefa inválido.";
        }
    
        if (empty($description)) {
            $errors[] = "Descrição inválida.";
        }
    
        // Se não houver erros, atualiza no banco de dados
        if (empty($errors)) {
            // Prepara a query SQL
            $sql = "UPDATE task SET task_name=?, task_description=?, task_stats=? WHERE id=?";
            $stmt = mysqli_prepare($connection, $sql);
    
            if ($stmt) {
                // Associa os parâmetros à query
                mysqli_stmt_bind_param($stmt, "sssi", $name, $description, $status, $id);
    
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