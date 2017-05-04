/**
 * Created by Oleksii on 28.04.2017.
 */

function show2Week() {
    // $('table').find('td.today').parents('tr').css({'background-color': 'khaki'})

    if ($('table').find('td.active').parents('tr').first()) {
        $('th.prev').click();
        $('table').find('td.today').parents('tr').css({'background-color': 'khaki'})
    }
}

function insertMemIntoForm(data) {
    $('table').find('td').each(function () {
        var cellText = $(this).text();
        var spanDate, spanMemesShort;
        spanDate = $('<span></span>').addClass('date').append(cellText);
        spanMemesShort = $('<span></span>').addClass('memesPerDayShort').append('json');
        $(this).empty().append(spanDate).append(spanMemesShort);
    })
}

function getMemes() {
    $.ajax({
        url: "/memes",
        dataType: "JSON",
        type: "GET"
    })
        .done(function (msg) {
            console.log('GET[done]=' + JSON.stringify(msg));
        })
        .fail(function (jqXHR, textStatus) {
            console.log('GET[fail]=' + JSON.stringify(textStatus));
        });
}

function addMem() {
    $.ajax({
        url: "/memes",
        dataType: "JSON",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            "shortDescription": 'israel',
            "fullDescription": 'Kamakawiwoole '
        })
    })
        .done(function (msg) {
            console.log('POST[done]=' + JSON.stringify(msg));
        })
        .fail(function (jqXHR, textStatus) {
            console.log('POST[fail]=' + JSON.stringify(textStatus));
        });

}


$(document).ready(function () {
    moment.locale('en', {
        week: {dow: 1}
    });

    $('#datePickerPage').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY'
        // showTodayButton: true
    });
    /*    insertValue();
     show2Week();*/
    $('td.day').click(function () {
        console.log('kjsdhfkjhsakdjfhkjshd');
    })

    // addMem();
    // getMemes();

});