// Funções

// Renderiza as tarefas.
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
        .append($('<th>', { text: 'Ações', class: 'text-center'}));

    const tbody = $('<tbody>');

    const statusMap = {
        'completed': { class: 'bg-success', text: 'Concluída' },
        'pending': { class: 'bg-danger', text: 'Pendente' },
        'in_progress': { class: 'bg-warning', text: 'Em Andamento' }
    };

    if (Array.isArray(response.tasks)) {
        response.tasks.forEach(e => {
            const tr_tbody = $('<tr>').append(
                $('<td>').append(
                    $('<input>', { type: 'hidden', id: 'task_id', value: e.id }),
                    e.task_name
                ),
                $('<td>', { text: e.task_description }),
                $('<td>').append(
                    $('<span>', {
                        class: `badge ${statusMap[e.task_stats]?.class || 'bg-secondary'}`,
                        text: statusMap[e.task_stats]?.text || 'Desconhecido'
                    })
                ),
                $('<td>', { class: 'text-center' }).append(
                    $('<button>', {
                        class: 'edit_btn btn btn-primary btn-sm m-1',
                        html: '<i class="fa-solid fa-pencil"></i> Editar'
                    }),
                    $('<button>', {
                        class: 'delete_task_btn btn btn-danger btn-sm m-1',
                        html: '<i class="fa-solid fa-trash"></i> Excluir'
                    }),
                    e.task_stats !== 'completed' ? $('<button>', {
                        class: 'complete_btn btn btn-success btn-sm m-1',
                        html: '<i class="fa-solid fa-circle"></i> Concluir'
                    }) : null
                )
            );
            tbody.append(tr_tbody);            
        });
    }

    tasksSection.append(title, table_responsive.append(table.append(thead.append(thead_tr), tbody)));
}

// Função assíncrona para listar as tarefas.
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

// Função assíncrona para buscar as tarefas.
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

// Função assíncrona para adicionar uma nova tarefa
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
                text: response.errors.join(', ') 
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

// Função assíncrona para editar uma tarefa já existente
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
                text: response.errors.join(', ') 
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

// Função assíncrona para deletar uma determinada tarefa
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
            alert("Id não encontrado ou Método não permitido")
        } else if (response.success === true) {
            task_list();
        }
        } catch (erro) {
            console.error('Erro ao enviar requisição:', erro);
        } finally {
            $('#loading').hide();
        }
}

// Função assíncrona para marcar uma tarefa como concluída.
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
                text: response.errors.join(', ')
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

    // Listar tarefas ao clicar no botão
    $('#task_list').click(function () {
        task_list();
    });

    // Buscar
    $('#search_form').on('submit', async function(e) {
        e.preventDefault();  

        const search_input = $('#search_input').val();  
        await search_task(search_input);   
    });

    // Adicionar tarefa
    $('#add_task_button').on('click', async function(e) {
        e.preventDefault();

        $('#add_task_popup, #overlay').fadeIn(250);
    
        const task_name = $('[name="add_task_name"]').val();
        const task_stats = $('[name="add_task_stats"]').val();
        const task_description = $('[name="add_task_description"]').val();
    
        await add_task(task_name, task_stats, task_description);
    });

    // Buscar dados da tr e coloca no popup para edição
    $(document).on('click', '.edit_btn', async function() {
        // Encontra a linha (tr) mais próxima do botão clicado
        const taskRow = $(this).closest('tr');
    
        // Captura os valores da linha
        const task_id = taskRow.find('#task_id').val(); 
        const task_name = taskRow.find('td').eq(0).text(); 
        const task_description = taskRow.find('td').eq(1).text(); 
        const task_status = taskRow.find('span').text(); 
    
        // Preenche os campos do popup de edição
        $('[name="edit_task_id"]').val(task_id);
        $('[name="edit_task_name"]').val(task_name);
        $('[name="edit_task_description"]').val(task_description);
        $('[name="edit_task_status"]').val(task_status);
        
        // Exibe o popup
        $('#edit_task_popup, #overlay').fadeIn(250);
    });
    
    // Buscar dados e editar tarefa
    $(document).on('submit', '#edit_task_form', async function(e) {
        e.preventDefault(); 
    
        const task_id = $('[name="edit_task_id"]').val(); 
        const task_name = $('[name="edit_task_name"]').val();
        const task_description = $('[name="edit_task_description"]').val(); 
        const task_stats = $('[name="edit_task_stats"]').val(); 
    
        await edit_task(task_id, task_name, task_description, task_stats);
    
        $('#edit_task_popup, #overlay').fadeOut(250);
    });

    // Fechar popup de editar tarefas
    $(document).on('click', '.close_popup_edit_task', function() {
        $('#edit_task_form')[0].reset();
        $('#edit_task_popup, #overlay').fadeOut(250)
    });

    // Busca o id da tarefa e executa a função de deletar tarefas
    $(document).on('click', '.delete_task_btn', async function() {
        const taskRow = $(this).closest('tr'); 
        const task_id = taskRow.find('#task_id').val(); 

        if(confirm(`Deseja realmente deletar essa tarefa?`)){
            await delete_task(task_id);
        }
    });

    // Busca os dados e reaproveita a função de editar do script.
    $(document).on('click', '.complete_btn', async function() {
        const taskRow = $(this).closest('tr');
        const task_id = taskRow.find('#task_id').val(); 
        const task_name = taskRow.find('td').eq(0).text(); 
        const task_description = taskRow.find('td').eq(1).text();
        const task_stats = 'completed'; 

        if(confirm(`Deseja realmente marcar essa tarefa como concluida?`)){
            await completed_task(task_id, task_name, task_description, task_stats);
        }      
    });
})