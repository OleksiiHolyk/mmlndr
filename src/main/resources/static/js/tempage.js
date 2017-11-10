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
    console.log('dayOfWeek=' + dow);
    console.log('dayOfMonth=' + dom);

    $('tr.secondWeek').find('td:eq(' + (dow - 1) + ')').text(dom);
}


function addDateToCalendar(date) {

    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    var yyyy = date.getFullYear();
    var formattedDate = (mm > 9 ? '' : '0') + mm + '/' + (dd > 9 ? '' : '0') + dd + '/' + yyyy;

    $('tbody').find('td:empty').first().text(dd).attr('data-day',formattedDate);




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
        console.log('dateArray'+i+'='+dateArray[i]);
    }
    console.log('currentDate.getDay()='+currentDate.getDay());
    var arrN = dateArray.slice(7-currentDate.getDay()+1);
    for (i = 0; i < arrN.length; i++) {
        // console.log('arrN'+i+'='+arrN[i]);
        addDateToCalendar(arrN[i]);
    }

}

$(document).ready(function () {
    $("button#getCurrentDate").click(function () {
        var today = new Date();
        // addCurrentDateToCalendar(today);
        getPeriod(today);
        // console.log('today=' + today)
    })
});




