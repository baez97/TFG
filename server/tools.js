var CalendarGenerator = function() {
    this.daysPerMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    this.getCalendarByYear = function(year) {
        var calendar = [];
        var weekday;
        var FebNumberOfDays;

        if ( (year%100!=0) && (year%4==0) || (year%400==0) ){
            this.daysPerMonth[1] = 29;
        }
        
        var date = new Date(year, 0, 1);
        var weekday = date.getDay();
        console.log(weekday);

        for ( i = 0; i < 12; i++ ) {
            calendar.push([]);
            date.setMonth(i);
            for ( j = 1; j <= this.daysPerMonth[i]; j++ ) {
                date.setDate(j);
                calendar[i].push({
                    day: j,
                    month: i+1,
                    year: year,
                    weekday: weekday
                })
                weekday = (weekday+1) > 7 ? 1 : weekday + 1;
            }
        }

        this.daysPerMonth[1] = 28;
        return calendar;
    }

    this.getWeek = function(s, calendar) {
        var [d, m, y] = s.split("/");
        var week = []
        var month = calendar[parseInt(m)-1];
        var dayObj = month[parseInt(d)-1];
        var monday = new Date(parseInt(y), parseInt(m), parseInt(d));
        monday.setDate(dayObj.day - dayObj.weekday + 1);

        for ( i = 0; i < 7; i++ ) {
            week.push(calendar[monday.getMonth()-1][monday.getDate()-1]);
            monday.setDate(monday.getDate() + 1);
        }

        return week;
    }
}

module.exports.CalendarGenerator = CalendarGenerator;