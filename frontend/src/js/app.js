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
            const no_response = $('<div>', {
                class: 'alert alert-info text-center',
                role: 'alert',
                text: 'Não há nenhuma tarefa para ser exibida, tente cadastrar uma.'
            });
            tasksSection.append(no_response);
        } else {
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

            response.forEach(e => {
                const tr_tbody = $('<tr>').append(
                    $('<input>', { type: 'hidden', id: 'id_task', value: e.id }),
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
                            class: 'btn btn-warning btn-sm mb-4 mb-lg-0',
                            id: 'edit_task',
                            html: '<i class="fa-solid fa-pencil"></i> Editar'
                        }),
                        $('<button>', {
                            class: 'btn btn-danger btn-sm mb-4 mb-lg-0',
                            id: 'delete_task',
                            html: '<i class="fa-solid fa-trash"></i> Excluir'
                        }),
                        $('<button>', {
                            class: 'btn btn-success btn-sm',
                            id: 'complete_task',
                            html: '<i class="fa-solid fa-circle"></i> Concluir'
                        })
                    )
                );
                tbody.append(tr_tbody);
            });

            tasksSection.append(title, table_responsive.append(table.append(thead.append(thead_tr), tbody)));
        }

    } catch (erro) {
        console.error('Erro ao enviar requisição:', erro);
    } finally {
        $('#loading').hide();
    }
}

$(document).ready(() => task_list());
$(document).ready(() => {
    // Funções para exibir/esconder itens
    $('#new_task_btn').click(() => {
        $('#task_popup, #overlay').fadeIn(250);
    });

    $('#close_popup, #overlay').click(() => {
        $('#task_popup, #overlay, #edit_task_popup').fadeOut(250);
    });

    $('#edit_task').click(() => {
        $('#edit_task_popup, #overlay').fadeIn(250);
    })

    // Listar tarefas
    $('#task_list').click(function () {
        task_list();
    });
})