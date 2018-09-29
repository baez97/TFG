// 1 -> nurse.askForChange();
// 2 -> service.addChange();
//      service.notifyAll();
// 3 -> nurse.notifyChangeRequest();

// 4 -> nurse.purposeChange();
// 5 -> service.addPurposal(change);


function Service(nurses) {
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