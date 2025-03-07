function render_tasks(response, tasksSection) {
    const title = $('<h2>', {
        class: 'bg-dark text-white text-center p-2 mb-0',
        text: 'Tarefas'
    });

    const table_responsive = $('<div>', { class: 'table-responsive' });
    const table = $('<table>', { class: 'table table-striped table-hover table-bordered' });
    const thead = $('<thead>', { class: 'thead-dark' });
    const thead_tr = $('<tr>')
        .append($('<th>', { text: 'Nome da Tarefa' }))
        .append($('<th>', { text: 'Descrição da Tarefa' }))
        .append($('<th>', { text: 'Status' }))
        .append($('<th>', { text: 'Ações' }));

    const tbody = $('<tbody>');

    const statusMap = {
        'completed': { class: 'bg-success', text: 'Concluída' },
        'pending': { class: 'bg-danger', text: 'Pendente' },
        'in_progress': { class: 'bg-warning', text: 'Em Andamento' }
    };

    if (Array.isArray(response.tasks)) {
        response.tasks.forEach(e => {
            const tr_tbody = $('<tr>').append(
                $('<input>', { type: 'hidden', id: 'task_id', value: e.id }),
                $('<td>', { text: e.task_name }),
                $('<td>', { text: e.task_description }),
                $('<td>').append(
                    $('<span>', {
                        class: `badge ${statusMap[e.task_stats]?.class || 'bg-secondary'}`,
                        text: statusMap[e.task_stats]?.text || 'Desconhecido'
                    })
                ),
                $('<td>').append(
                    $('<button>', {
                        class: 'btn btn-primary btn-sm mb-4 mb-lg-0 me-1 edit_btn',
                        html: '<i class="fa-solid fa-pencil"></i> Editar'
                    }),
                    $('<button>', {
                        class: 'btn btn-danger btn-sm mb-4 mb-lg-0 me-1 delete_task_btn',
                        html: '<i class="fa-solid fa-trash"></i> Excluir'
                    }),
                    // Verifica se o status não é 'completed' antes de adicionar o label e o input
                    e.task_stats !== 'completed' ? $('<label>', {
                        for: 'complete_task',
                        class: 'btn btn-success btn-sm mb-4 mb-lg-0 me-1',
                        html: '<i class="fa-solid fa-circle"></i> Concluir'
                    }) : null,
                    e.task_stats !== 'completed' ? $('<input>', {
                        type: 'checkbox',
                        class: 'btn-check complete_btn',
                        autocomplete: 'off',
                        name: 'complete_task',
                        id: 'complete_task'
                    }) : null
                )
            );
            tbody.append(tr_tbody);
        });
    }

    tasksSection.append(title, table_responsive.append(table.append(thead.append(thead_tr), tbody)));
}

async function task_list() {
    try {
        $('#loading').show();

        const response = await $.ajax({
            url: '../backend/routes/task_routes.php',
            method: 'GET',
            contentType: 'application/json'
        });

        const tasksSection = $('#tasks');
        tasksSection.empty();
        $('.alert').hide();

        if (response.message === "Nenhuma tarefa encontrada.") {
            const empty_response = $('<div>', {
                class: 'alert alert-info text-center',
                role: 'alert',
                text: 'Não há nenhuma tarefa para ser exibida, tente cadastrar uma.'
            });
            tasksSection.append(empty_response);
        } else {
            render_tasks(response, tasksSection)
        }

        } catch (erro) {
            console.error('Erro ao enviar requisição:', erro);
        } finally {
            $('#loading').hide();
        }
}

async function search_task(search_input) {
    try {
        $('#loading').show();

        const response = await $.ajax({
            url: `../backend/routes/task_routes.php?source=search&search=${search_input}`,
            method: 'GET',
            contentType: 'application/json'
        });

        const tasksSection = $('#tasks');
        tasksSection.empty();
        $('.alert').hide();

        if (response.message === "Nenhuma tarefa encontrada." || response.message === "O campo de busca está vazio.") {
            const empty_response = $('<div>', {
                class: 'alert alert-info text-center',
                role: 'alert',
                text: 'Não há nenhuma tarefa para ser exibida, tente cadastrar uma.'
            });
            tasksSection.append(empty_response);
        } else {
            render_tasks(response, tasksSection)
        }

    } catch (erro) {
        console.error('Erro ao enviar requisição:', erro);
    } finally {
        $('#loading').hide();
    }
}

async function add_task(task_name, task_stats, task_description) {
    try {
        $('#loading').show();

        const data = {
            task_name: task_name,
            task_stats: task_stats,
            task_description: task_description
        };

        const response = await $.ajax({
            url: `../backend/routes/task_routes.php`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
        });

        $('.alert').hide();
        const task_popup_container = $('#task_popup_container')

        if (response.success === false && response.message === "Erros de validação:") {
            const not_validated = $('<div>', {
                class: 'alert alert-info text-center my-3',
                role: 'alert',
                text: response.errors.join(', ')  // Exibe erros como uma string concatenada
            });
            task_popup_container.append(not_validated);
        } else if (response.success === true) {
            $('#task_form')[0].reset();
            $('#add_task_popup, #overlay, #edit_task_popup').fadeOut(250);
            task_list();
        }
        } catch (erro) {
            console.error('Erro ao enviar requisição:', erro);
        } finally {
            $('#loading').hide();
        }
}

async function edit_task(task_id, task_name, task_description, task_stats){
    try {
        $('#loading').show();

        const data = {
            task_id: task_id,
            task_name: task_name,
            task_description: task_description,
            task_stats: task_stats
        };

        const response = await $.ajax({
            url: `../backend/routes/task_routes.php`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
        });

        $('.alert').hide();
        const id_task_popup_container = $('#id_task_popup_container')

        if (response.success === false && response.message === "Erros de validação:") {
            const not_validated = $('<div>', {
                class: 'alert alert-info text-center my-3',
                role: 'alert',
                text: response.errors.join(', ')  // Exibe erros como uma string concatenada
            });
            id_task_popup_container.append(not_validated);
        } else if (response.success === true) {
            $('#edit_task_form')[0].reset();
            $('#add_task_popup, #overlay, #edit_task_popup').fadeOut(250);
            task_list();
        }
        } catch (erro) {
            console.error('Erro ao enviar requisição:', erro);
        } finally {
            $('#loading').hide();
        }
}

async function delete_task(task_id){
    try {
        $('#loading').show();

        const data = {
            task_id: task_id
        };

        const response = await $.ajax({
            url: `../backend/routes/task_routes.php`,
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(data),
        });

        $('.alert').hide();

        if (response.success === false && response.message === "Método não permitido.") {
            //
        } else if (response.success === true) {
            task_list();
        }
        } catch (erro) {
            console.error('Erro ao enviar requisição:', erro);
        } finally {
            $('#loading').hide();
        }
}

async function completed_task(task_id, task_name, task_description, task_stats){
    try {
        $('#loading').show();

        const data = {
            task_id: task_id,
            task_name: task_name,
            task_description: task_description,
            task_stats: task_stats
        };

        const response = await $.ajax({
            url: `../backend/routes/task_routes.php`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
        });

        $('.alert').hide();

        if (response.success === false && response.message === "Erros de validação:") {
            const not_validated = $('<div>', {
                class: 'alert alert-info text-center my-3',
                role: 'alert',
                text: response.errors.join(', ')  // Exibe erros como uma string concatenada
            });
        } else if (response.success === true) {
            task_list();
        }
        } catch (erro) {
            console.error('Erro ao enviar requisição:', erro);
        } finally {
            $('#loading').hide();
        }
}

$(document).ready(() => {
    task_list()

    // Funções para exibir/esconder itens
    $('#new_task_btn').click(() => {
        $('#add_task_popup, #overlay').fadeIn(250);
    });

    $('#close_popup_new_task, #overlay').click(() => {
        $('#task_form')[0].reset();
        $('#add_task_popup, #overlay').fadeOut(250);
    });

    // Listar tarefas
    $('#task_list').click(function () {
        task_list();
    });

    $('#search_form').on('submit', async (e) => {
        e.preventDefault();  

        const search_input = $('#search_input').val();  
        await search_task(search_input);   
    });

    $('#add_task_button').on('click', async (e) => {
        e.preventDefault();

        $('#add_task_popup, #overlay').fadeIn(250);
    
        // Pega os valores dos campos do formulário
        const task_name = $('[name="add_task_name"]').val();
        const task_stats = $('[name="add_task_stats"]').val();
        const task_description = $('[name="add_task_description"]').val();
    
        // Chama a função de adicionar tarefa
        await add_task(task_name, task_stats, task_description);
    });

    $(document).on('click', '.edit_btn', async function() {
        const taskRow = $(this).closest('tr'); // Pega a linha mais próxima do botão de editar
        const task_id = taskRow.find('#task_id').val(); // ID da tarefa
        const task_name = taskRow.find('td').eq(0).text(); // Nome da tarefa (primeira coluna)
        const task_description = taskRow.find('td').eq(1).text(); // Descrição da tarefa (segunda coluna)
        const task_status = taskRow.find('span').text(); // Status da tarefa (badge)
    
        $('[name="edit_task_id"]').val(task_id);
        $('[name="edit_task_name"]').val(task_name);
        $('[name="edit_task_description"]').val(task_description);
        $('[name="edit_task_status"]').val(task_status);

        // Exibe o popup de edição
        $('#edit_task_popup, #overlay').fadeIn(250);
    });
    
    $(document).on('submit', '#edit_task_form', async function(e) {
        e.preventDefault(); // Previne o envio padrão do formulário
    
        const task_id = $('[name="edit_task_id"]').val(); // ID da tarefa, adicione este campo oculto no seu formulário
        const task_name = $('[name="edit_task_name"]').val(); // Nome da tarefa
        const task_description = $('[name="edit_task_description"]').val(); // Descrição da tarefa
        const task_stats = $('[name="edit_task_stats"]').val(); // Status da tarefa
    
        // Chama a função async edit_task
        await edit_task(task_id, task_name, task_description, task_stats);
    
        // Fecha o popup após o envio
        $('#edit_task_popup, #overlay').fadeOut(250);
    });

    $(document).on('click', '.close_popup_edit_task', function() {
        $('#edit_task_form')[0].reset();
        $('#edit_task_popup, #overlay').fadeOut(250)
    });

    $(document).on('click', '.delete_task_btn', async function() {
        const taskRow = $(this).closest('tr'); // Pega a linha mais próxima do botão de editar
        const task_id = taskRow.find('#task_id').val(); // ID da tarefa

        if(confirm(`Deseja realmente deletar essa tarefa?`)){
            await delete_task(task_id);
        }
    });

    $(document).on('click', '.complete_btn', async function() {
        const taskRow = $(this).closest('tr'); // Pega a linha mais próxima do botão de editar
        const task_id = taskRow.find('#task_id').val(); // ID da tarefa
        const task_name = taskRow.find('td').eq(0).text(); // Nome da tarefa (primeira coluna)
        const task_description = taskRow.find('td').eq(1).text(); // Descrição da tarefa (segunda coluna)
        const task_stats = 'completed'; // Status da tarefa (badge)

        if(confirm(`Deseja realmente marcar essa tarefa como concluida?`)){
            await completed_task(task_id, task_name, task_description, task_stats);
        }      
    });
})