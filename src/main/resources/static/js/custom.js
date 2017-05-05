/**
 * Created by Oleksii on 28.04.2017.
 */

function show2Week() {
    /*Detect if active day in first row at page*/
    if ($('table.table-condensed').find('td.active').parents('tr').is(':first-child')) {
        $('div.datepicker-days').find('th.prev').click();
    } else {
    }
    $('.table-condensed').find('tr').each(function () {
        $(this).hide();
    });
    $('td.active').parents('tr').show().css({"height": "50%"});
    $('td.active').parents('tr').prev().show().css({"height": "50%"});

    getMemes();
}

function tempName(data) {
    var dateLong, shortD, date, dateFormattedMDY, dateFormattedDMY;
    dateLong = data.date;
    shortD = data.shortDescription;
    date = new Date(dateLong);
    dateFormattedMDY = moment(date).format('MM/DD/YYYY');
    dateFormattedDMY = moment(date).format('DD/MM/YYYY');
    console.log('dt=' + dateFormattedMDY + ', shrt=' + shortD);


    // $("td").find("[data-day='" + dateFormatted + "']").css({'background-color':'khaki'});
    var spanMemesShort, spanDate;
    spanDate = $('<span></span>').addClass('date').append(dateFormattedDMY);
    spanMemesShort = $('<span></span>').addClass('memesPerDayShort').append(shortD);

    $("td[data-day='" + dateFormattedMDY + "']").append(spanMemesShort);

}

function getMemes() {
    $.ajax({
        url: "/memes",
        dataType: "JSON",
        type: "GET"
    })
        .done(function (msg) {
            // console.log('GET[done]=' + JSON.stringify(msg));
            $.each(msg._embedded.memes, function (key, value) {
                // console.log('mem='+JSON.stringify(value))
                tempName(value);
            });
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

    $('div#datePickerPage').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY'
        /*display 'today' button*/
        // showTodayButton: true
    });

    show2Week();

    $("form#addForm").submit(function (event) {
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

    $('button#clickMe').click(function () {
        show2Week();
    })
});