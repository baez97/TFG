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
        var weekday = date.getDay() == 0 ? 7 : date.getDay();

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

    this.generateFirstWeekJanuary = function(y) {
        var year = parseInt(y) + 1;
        var date = new Date(year, 0, 1);
        var weekday = date.getDay();
        var week = [];

        for ( j = 1; j <= 7; j++ ) {
            date.setDate(j);
            week.push({
                day: j,
                month: 1,
                year: year,
                weekday: weekday
            })
            weekday = (weekday+1) > 7 ? 1 : weekday + 1;
        }

        return week;
    }

    
    this.getWeek = function(s, calendar) {
        var [d, m, y] = s.split("/");
        var day = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
        var weekday = day.getDay() == 0 ? 6 : day.getDay() -1;
        
        if ( parseInt(m) == 1 && (parseInt(d) + (6 - weekday) < 7) ) {
            return this.getWeekJanuary(s, calendar);
        } else if ( parseInt(m) == 12 && (parseInt(d) - weekday > 24) ) {
            return this.getWeekDecember(s, calendar);
        }
        
        var week = []
        var month = calendar[parseInt(m)-1];
        var dayObj = month[parseInt(d)-1];
        var monday = new Date(parseInt(y), parseInt(m) -1, parseInt(d));
        monday.setDate(dayObj.day - dayObj.weekday +1);
        
        for ( i = 0; i < 7; i++ ) {
            week.push(calendar[monday.getMonth()][monday.getDate() -1]);
            monday.setDate(monday.getDate() + 1);
        }
        
        return week;
    }
    
    this.getWeekDecember = function(s, calendar) {
        var [d, m, y] = s.split("/");
        var jan_week = this.generateFirstWeekJanuary(y);
        var week = [];
        
        var month = calendar[11];
        var dayObj = month[parseInt(d)-1];
        var monday = new Date(parseInt(y), 11, parseInt(d));
        monday.setDate(dayObj.day - dayObj.weekday +1);
        
        
        var days_needed = 6 - (31 - monday.getDate());
        for ( i = monday.getDate() - 1; i < 31; i++ ) {
            week.push(month[i]);
        }
        for ( i = 0; i < days_needed; i++ ) {
            week.push(jan_week[i]);
        }
        
        return week;
    }
    
    this.getWeekJanuary = function(s, calendar) {
        var [d, m, y] = s.split("/");
        var dec_week = this.generateLastWeekDecember(y);
        console.log("---");
        console.log(dec_week);
        console.log("---");
        var week = [];

        var month = calendar[0];

        for ( i = 0; i < dec_week.length; i++ ) {
            week.push(dec_week[i]);
        }
        for ( i = 0; i < 7-dec_week.length; i++ ) {
            week.push(month[i]);
        }

        return week;
    }

    this.generateLastWeekDecember = function(y) {
        var year = parseInt(y) -1;
        var date = new Date(year, 11, 31);
        var weekday = 1;
        var week = [];

        for ( j = date.getDate() - date.getDay() +1; j <= 31; j++ ) {
            date.setDate(j);
            week.push({
                day: date.getDate(),
                month: date.getMonth() +1,
                year: year,
                weekday: weekday
            })
            weekday = (weekday+1) > 7 ? 1 : weekday + 1;
        }
        return week;
    }

}

var calendarG = new CalendarGenerator();
var calendar = calendarG.getCalendarByYear(2017);