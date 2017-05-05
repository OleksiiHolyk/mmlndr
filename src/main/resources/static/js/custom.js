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

function addMem(jsonData) {
    $.ajax({
        url: "/memes",
        dataType: "JSON",
        type: "POST",
        contentType: "application/json",
        data: jsonData
    })
        .done(function (msg) {
            console.log('POST[done]=' + JSON.stringify(msg));
            alert('Mem has been  successfully added')
        })
        .fail(function (jqXHR, textStatus) {
            console.log('POST[fail]=' + JSON.stringify(textStatus));
            alert('Error operation')
        });

}


$(document).ready(function () {
    moment.locale('en', {
        week: {dow: 1}
    });

    $('#datePickerPage').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY'
        /*display 'today' button*/
        // showTodayButton: true
    });
    /*    insertValue();
     show2Week();*/

    $("#addForm").submit(function (event) {
        var data = {};
        $(this).serializeArray().map(function (x) {
            if (x.name == 'date') {
                data[x.name] = Date.parse(x.value);
            } else {
                data[x.name] = x.value;
            }
        });
        addMem(JSON.stringify(data));
        /*close modal window after form submit*/
        event.preventDefault();
    });

    // addMem();
    // getMemes();

});