/**
 * Created by Oleksii on 28.04.2017.
 */
function show2Week(){
}


$(document).ready(function () {
    moment.locale('en', {
        week: {dow: 1}
    });

    $('#datePickerPage').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY'
    });

    show2Week();



})