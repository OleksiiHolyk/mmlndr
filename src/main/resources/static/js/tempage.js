/**
 * Created by Oleksii on 08.11.2017.
 */
$(document).ready(function () {
    $("button#getCurrentDate").click(function () {
        var today = new Date();
        var momentDay = moment(today);
        var dayOfWeek = momentDay.day();
        console.log(dayOfWeek);
    })
});