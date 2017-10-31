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

function addDataToCalendar(data) {
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
    $('div.loader').show();
    $('div#datePickerPage').hide();
    $('div#buttonsLine').hide();
    $.ajax({
        url: "/memes",
        dataType: "JSON",
        type: "GET"
    })
        .done(function (msg) {
            // console.log('GET[done]=' + JSON.stringify(msg));
            $.each(msg._embedded.memes, function (key, value) {
                // console.log('mem='+JSON.stringify(value))
                addDataToCalendar(value);
            });
            $('div.loader').hide();
            $('div#datePickerPage').show();
            $('div#buttonsLine').show();

        })
        .fail(function (jqXHR, textStatus) {
            console.log('GET[fail]=' + JSON.stringify(textStatus));
            $('div.loader').hide();

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
            location.reload();
        })
        .fail(function (jqXHR, textStatus) {
            console.log('POST[fail]=' + JSON.stringify(textStatus));
            alert('Error operation')
        });

}

function clearForm(formName) {
    $(formName).find('.modal-body').empty();
    // $(formName).find('.modal-header').empty();
}

function insertDataIntoModalRead(data) {
    clearForm('#readForm');

    var divReadData = $('<div></div>').append(data).addClass('modalReadData');
    $('form#readForm').find('div.modal-body').append(divReadData);
    $('div#readDay').modal('show');

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

    $('div.datepicker-days').find('td.day').click(function (e) {
        e.preventDefault();
        var dayMemText = $(this).text();

        insertDataIntoModalRead(dayMemText);
        return false;
    });

    /**
     * input date support for Apple Safari
     * */
    if ($('div#addMem').find('input#date')[0].type != 'date') {
        $('div#addMem').find('input#date').datepicker();
    }

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

    /*$('button#clickMe').click(function () {
     show2Week();
     })*/
});