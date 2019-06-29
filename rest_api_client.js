$(function () {
    $(document).on('change', '.operation', function () {
        const selected_operation = $(this).children('select').val();
        const operation_number = $(this).attr('operation_number');

        if (selected_operation === "delete") {
            delete_parameter(operation_number);
        }
    });

    /* 新しい操作の追加 */
    $('#add_operation').click(function () {
        const operation_number = $('section').length + 1;
        $(".api[api_number='1']").clone().attr('api_number', operation_number).appendTo("form");
        $(".api[api_number='" + operation_number + "'").children('.operation').attr('operation_number', operation_number);
        $(".operation[operation_number='" + operation_number + "'").children('select').attr('name', 'action_' + operation_number);
        $(".api[api_number='" + operation_number + "'").children('.parameter').attr('parameter_number', operation_number);
        $(".api[api_number='" + operation_number + "'").children('.result').attr('result_number', operation_number);
        $(".api[api_number='" + operation_number + "'").children('.parameter').empty();

    })
});

function delete_parameter(operation_number) {
    $(".parameter[parameter_number='" + operation_number + "'")
        .empty()
        .append(`<div>
                    <label for="username_${operation_number}">ID: <abbr title="required">*</abbr></label>
                    <input id="username_${operation_number}" type="text" name="username_${operation_number}">
                </div>`)
        .append(`<div>
                    <label for="uername_${operation_number}">STATUS: <abbr title="required">*</abbr></label>
                    <input id="uername_${operation_number}" type="text" name="uername_${operation_number}">
                </div>`);
}
