var model = require('./model.js');
describe("Nurses Test", function() {

    var nurse_1, nurse_2;
    var turn_1, turn_2;
    var schedule_1, schedule_2;
    var service;
    var purposal;
  
    beforeEach(function() {
        turn_1     = new model.Turn("03/06/2018", "M");
        schedule_1 = new model.Schedule([turn_1]);
        nurse_1    = new model.Nurse(1, "Ana", 1);

        turn_2     = new model.Turn("04/06/2018", "T");
        schedule_2 = new model.Schedule([turn_2]);
        nurse_2    = new model.Nurse(2, "Marce", 2);

        purposal = new model.Purposal(nurse_1, turn_2);

        //service = new model.Service([nurse_1, nurse_2]);
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
        turn_1.setValue("M");
        turn_2.setValue("T");
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
        var purposal = new model.Purposal(nurse_1, turn_2);
        expect( purposal.getNurse() ).toEqual(nurse_1);
        expect( purposal.getDate()  ).toEqual("04/06/2018");
        expect( purposal.getValue() ).toEqual("T");
    });

    it("Changes have a nurse, turn and purposals, and can manipulate the purposals collection", function() {
        var change = new model.Change(nurse_1, turn_1);
        change.addPurposal(purposal);
        expect( change.getPurposals().length ).toEqual(1);
        change.denyPurposal(purposal);
        expect( change.getPurposals().length ).toEqual(0);
    });

    it("Nurses are notified about changes", function () {
        var change = new model.Change(nurse_2, turn_1);
        console.log = jasmine.createSpy("log");
        change.addPurposal(purposal);
        expect(console.log).toHaveBeenCalledWith("Marce! Ana can change your turn by 04/06/2018 (T)");
        change.denyPurposal(purposal);
        expect(console.log).toHaveBeenCalledWith("Ana! Sorry but Marce didn't accepted your purposal");
        change.addPurposal(purposal);
    });
});
  