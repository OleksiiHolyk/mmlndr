/**
 * Created by Oleksii on 28.04.2017.
 */
function show2Week() {

}

function insertValue() {
    $('table').find('td').each(function () {
        var cellText = $(this).text();
        var spanDate, spanMemesShort;
        spanDate = $('<span></span>').addClass('date').append(cellText);
        spanMemesShort = $('<span></span>').addClass('memesPerDayShort').append('json');
        $(this).empty().append(spanDate).append(spanMemesShort);
    })
}


$(document).ready(function () {
    moment.locale('en', {
        week: {dow: 1}
    });

    $('#datePickerPage').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY'
    });
    insertValue();
    show2Week();

})