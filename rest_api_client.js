$(function () {
    $(document).on('change', '.operation', function () {
        const selected_operation = $(this).children('select').val();
        const operation_number = $(this).attr('operation_number');

        /* 前回選択分をクリア */
        $(".parameter[parameter_number='" + operation_number + "'").empty();
        $(".result[result_number='" + operation_number + "'").empty();

        /* 操作に応じて、パラメータ用formを作成 */
        if (selected_operation === "delete") {
            delete_form(operation_number);
        } else if (selected_operation === "create") {
            create_form(operation_number);
        }
    });

    /* 新しい操作の追加 */
    $('#add_operation').click(() => {
        const operation_number = $('section').length + 1;
        const add_api_class = ".api[api_number='" + operation_number + "'";

        $(".api[api_number='1']").clone().attr('api_number', operation_number).appendTo("footer");
        $(add_api_class).children('.operation').attr('operation_number', operation_number);
        $(".operation[operation_number='" + operation_number + "'").children('select').attr('name', 'action_' + operation_number);
        $(add_api_class).children('.parameter').attr('parameter_number', operation_number);
        $(add_api_class).children('.result').attr('result_number', operation_number);
        $(add_api_class).children('.parameter').empty();
        $(add_api_class).children('.result').empty();
    })
});


$(() => {
    $('#api_send').on('click', () => {
        const api_number_max = $('section').length;
        let deferred = $.Deferred().resolve();
        for (let api_number = 1; api_number <= api_number_max; api_number++) {
            deferred = deferred.then(() => { return test(api_number); });
        }
    });
});

function create_form(operation_number) {
    $(".parameter[parameter_number='" + operation_number + "'")
        .empty()
        .attr('enctype', 'multipart/form-data')
        .append(`<div>
                    <label for="file_${operation_number}">Choose a xml file</label>
                    <input type="file" id="file_${operation_number}" name="xmlFile" multiple>
                </div>`);
};

function delete_form(operation_number) {
    $(".parameter[parameter_number='" + operation_number + "'")
        .empty()
        .append(`<div>
                    <label for="operation_${operation_number}">ID: <abbr title="required">*</abbr></label>
                    <input id="operation_${operation_number}" type="text" name="operation_${operation_number}" required>
                </div>`)
        .append(`<div>
                    <label for="status_${operation_number}">STATUS: <abbr title="required">*</abbr></label>
                    <input id="status_${operation_number}" type="text" name="status_${operation_number}">
                </div>`);
};

function test(api_number) {
    const operation = $("select[name='action_" + api_number + "']").val();
    const parameter = $(".parameter[parameter_number='" + api_number + "']").serialize();
    let dfd = $.Deferred();

    setTimeout(function () {
        $(".result[result_number='" + api_number + "']").empty();
        $(".result[result_number='" + api_number + "']").append(operation);
        $(".result[result_number='" + api_number + "']").append(parameter);
        $('#api_send').attr('disabled', false);
        dfd.resolve();
    }, 2000, api_number);

    return dfd.promise();
};

function exec_api(api_number) {
    const operation = $("select[name='action_" + api_number + "']").val();
    const parameter = $(".parameter[parameter_number='" + api_number + "']").serialize();

    $.ajax({
        url: "./js/jquery.d.ts",
        type: "POST",
        data: parameter,
        beforeSend: function () {
            $('#api_send').attr('disabled', true);
        }
    }).always(function () {
        $(".result[result_number='" + api_number + "']").empty();
        $(".result[result_number='" + api_number + "']").append(operation);
        $(".result[result_number='" + api_number + "']").append(parameter);
        $('#api_send').attr('disabled', false);
    });
};
