function Nurse(name, schedule) {
    this.name = name;
    this.schedule = schedule;

    var sayHello = function() {
        console.log("Hi! I am " + this.name);
    }
}

function Schedule(table) {
    this.table = table;

    var getTable = function() {
        return this.table;
    }
}

module.exports.Nurse = Nurse;
module.exports.Schedule = Schedule;