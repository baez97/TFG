describe("Nurses Test", function() {

    var nurse_1, nurse_2;
    var turn_1, turn_2;
    var schedule_1, schedule_2;
    var service;
    var purposal;
  
    beforeEach(function() {
        
        turn_1     = new Turn("03/06/2018", "M");
        turn_2     = new Turn("04/06/2018", "T");
        
        schedule_1 = new Schedule([turn_1]);
        schedule_2 = new Schedule([turn_2]);
        
        nurse_1    = new Nurse(1, "Ana",   schedule_1, service);
        nurse_2    = new Nurse(2, "Marce", schedule_2, service);
        
        service = new Service([nurse_1, nurse_2]);
        purposal   = new Purposal(nurse_1, turn_2);

        console.log = jasmine.createSpy("log");
    });

    it("Nurses have name and schedule defined", function() {
        expect( nurse_1.name     ).toBeDefined();
        expect( nurse_1.schedule ).toBeDefined();
        expect( nurse_2.name     ).toBeDefined();
        expect( nurse_2.schedule ).toBeDefined();
    });

    it("Turns have date and value", function() {
        expect( turn_1.date  ).toBeDefined();
        expect( turn_1.value ).toBeDefined();
        expect( turn_2.date  ).toBeDefined();
        expect( turn_2.value ).toBeDefined();
    });

    it("Turn can get and set value", function() {
        turn_1.setValue("T");
        turn_2.setValue("M");
        expect( turn_1.getValue() ).toEqual("T");
        expect( turn_2.getValue() ).toEqual("M");
    });

    it("Schedule can get, set and add turns", function() {
        var turn1 = schedule_1.getTurn("03/06/2018"); 
        var turn2 = schedule_2.getTurn("04/06/2018");
        
        expect( turn1.date  ).toEqual("03/06/2018");
        expect( turn2.date  ).toEqual("04/06/2018");
        expect( turn1.value ).toEqual("M");
        expect( turn2.value ).toEqual("T");

        schedule_1.addTurn(turn2);
        schedule_2.addTurn(turn1);

        expect( schedule_1.getTurns().length ).toEqual(2);
        expect( schedule_2.getTurns().length ).toEqual(2);

        schedule_1.setTurn("04/06/2018", "L");
        schedule_2.setTurn("03/06/2018", "L");

        expect( schedule_1.getTurn("04/06/2018").value ).toEqual("L");
        expect( schedule_2.getTurn("03/06/2018").value ).toEqual("L");
    });

    it("Purposals have nurse, date and value, and returns them correctly", function() {
        var purposal = new Purposal(nurse_1, turn_2);

        expect( purposal.getNurse() ).toEqual(nurse_1);
        expect( purposal.getDate()  ).toEqual("04/06/2018");
        expect( purposal.getValue() ).toEqual("T");
    });

    it("Nurses are notified about changes", function () {
        var change = new Change(nurse_2, turn_1);

        change.addPurposal(purposal);
        expect( console.log ).toHaveBeenCalledWith("Marce! Ana can change your turn by 04/06/2018 (T)");

        change.denyPurposal(purposal);
        expect( console.log ).toHaveBeenCalledWith("Ana! Sorry but Marce didn't accepted your purposal");
    });

    it("Service has nurses, changes and history defined", function() {
        expect( service.nurses        ).toBeDefined();
        expect( service.history       ).toBeDefined();
        expect( service.changes       ).toBeDefined();
        expect( service.nurses.length ).toEqual(2);
    });

    it("A nurse can ask for change their shifts, and the rest are notified", function() {
        var turn = nurse_1.getTurn("03/06/2018");
        nurse_1.askForChange(turn);
        expect( console.log ).toHaveBeenCalledWith("Marce! Ana wants to change 03/06/2018 (M)")
    });

});

describe("Calendar Test", function() {
    
    var calendarGenerator = new CalendarGenerator();
    var calendar = calendarGenerator.getCalendarByYear(2018);
    
    it("Calendar is properly generated", function() {
        var first_weekday_2018 = [1, 4, 4, 7, 2, 5, 7, 3, 6, 1, 4, 6];
        var last_weekday_2018  = [3, 3, 6, 1, 4, 6, 2, 5, 7, 3, 5, 1];
    
        for ( i = 0; i < 12; i++ ) {
            var last = calendar[i].length - 1;
            expect ( calendar[i][0].weekday    ).toEqual(first_weekday_2018[i]);
            expect ( calendar[i][last].weekday ).toEqual(last_weekday_2018[i]);
        }
    });
});