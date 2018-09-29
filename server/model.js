const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function Nurse(id, name, schedule /*,service*/) {
    this.id = id;
    this.name = name;
    this.schedule = schedule;
    //this.service = service;

    this.sayHello = function() {
        console.log("Hi! I am " + this.name);
    }

    this.getName = function() {
        return this.name;
    }

    this.setTurn = function(date, value) {
        this.schedule.setTurn(date, value);
    }

    this.notifyPurposal = function(purposal) {
        console.log(this.name+"! "+purposal.getNurse().getName() + 
                    " can change your turn by " + purposal.getDate() + 
                    " (" + purposal.getValue() + ")");
    }

    this.notifyDeny = function(name) {
        console.log(this.name+"! Sorry but "+name+ " didn't accepted your purposal");
    }

    // this.askForChange = function(date, value) {
    //     this.service.askForChange(this, date, value);
    // }

    // this.notify = function(change) {
    //     console.log("Hey! "+change.nurse+" wants to change day "+change.date+"("+change.value+")");
    //     rl.question('Accept? ', (answer) => {
    //         if (answer == 'Y' ){
    //             console.log("Change accepted");
    //         } else {
    //             console.log("Change rejected");
    //         }
    //         rl.close();
    //     });

    // }
};

function Schedule(turns) {
    this.turns = turns;

    this.getTurns = function() {
        return this.turns;
    };

    this.getTurn = function(date) {
        return this.turns.find(function(turn) { 
            return turn.date == date 
        });
    }

    this.addTurn = function(turn) {
        this.turns.push(turn);
    };

    this.setTurn = function(date, value) {
        turns.forEach(turn => {
            if ( turn.date == date ) {
                return turn.setValue(value);
            }
        });
    }
};

function Turn(date, value) {
    this.date = date;
    this.value = value;

    this.getValue = function() {
        return this.value;
    };

    this.getDate = function() {
        return this.date;
    };

    this.setValue = function(value) {
        this.value = value;
    };
};

// function Service(nurses) {
//     this.nurses = nurses;
//     this.changes = [];
//     this.history = [];
    
//     this.askForChange = function(nurse, date, value) {
//         var change = new Change(nurse, date, value);
//         this.changes.push(change);
//         this.nurses.forEach(e => {
//             if ( e.id != nurse.id ) {
//                 notify(change);
//             }
//         });
//     }

//     this.purposeChange = function(change, nurse, date, value) {
//         var purposal = new Purposal(nurse, date, value);
//         change.addPurposal(purposal);
//     }

//     this.notifyChange = function(change, purposal) {
//         //this.changes.delete(change);
//         this.history.add({change: change, purposal: purposal});
//     }
// }

function Change(nurse, date, value) {
    this.nurse = nurse;
    this.date = date;
    this.value = value;
    this.purposals = [];

    this.addPurposal = function(purposal) {
        this.nurse.notifyPurposal(purposal);
        this.purposals.push(purposal);
    }

    this.denyPurposal = function(purposal) {
        purposal.notifyDeny(this.nurse.getName());
        var index = this.purposals.indexOf(purposal);
        if (index > -1) {
            this.purposals.splice(index, 1);
        }
    }

    this.confirmPurposal = function(purposal) {
        // this.service.notifyChange(this, purposal);
        purposal.notifyAccept(this.date, this.value);
        this.nurse.setTurn(this.date, purposal.getValue());
    }

    this.getPurposals = function() {
        return this.purposals;
    }
}

function Purposal(nurse, turn) {
    this.nurse = nurse;
    this.turn = turn;

    this.getNurse = function() {
        return this.nurse;
    }

    this.getTurn = function() {
        return this.turn;
    };

    this.getDate = function() {
        return this.turn.getDate();
    };

    this.getValue = function() {
        return this.turn.getValue();
    };

    this.notifyDeny = function(name) {
        this.nurse.notifyDeny(name);
    };
}
module.exports.Nurse = Nurse;
module.exports.Schedule = Schedule;
module.exports.Turn = Turn;
module.exports.Purposal = Purposal;
// module.exports.Service = Service;
module.exports.Change = Change;
