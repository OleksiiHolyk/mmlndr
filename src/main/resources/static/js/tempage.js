/**
 * Created by Oleksii on 08.11.2017.
 */
function addCurrentDateToCalendar(date) {

    /**
     * implementation using moment.js
     *
     * var momentDay = moment(date);
     * var dayOfWeek = momentDay.day();
     * var dayOfMonth = momentDay.date();
     * */

    var dom = date.getDate();   //date of month
    var dow = date.getDay();    //date of week
    console.log('dayOfWeek=' + dom);
    $('tr.secondWeek').find('td:eq(' + (dow - 1) + ')').text(dom);
}

function getPeriod(currentDate) {
    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    function getDates(dateFrom, dateTo) {
        var dateArray = [];
        while (dateFrom <= dateTo) {
            dateArray.push(dateFrom);
            dateFrom = dateFrom.addDays(1);
        }
        return dateArray;
    }


    var prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 14); // minus the date

    var dateArray = getDates(prevDate, currentDate);
    for (i = 0; i < dateArray.length; i++) {
        console.log(dateArray[i]);
    }
}

$(document).ready(function () {
    $("button#getCurrentDate").click(function () {
        var today = new Date();
        addCurrentDateToCalendar(today);
        getPeriod(today);
        console.log('today=' + today)
    })
});




