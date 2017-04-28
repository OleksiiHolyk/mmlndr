/**
 * Created by Oleksii on 28.04.2017.
 */
$( document ).ready(function () {
    moment.locale('en', {
        week: {dow: 1}
    });

    $('#datetimepicker12').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY'
    });


})