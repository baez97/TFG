var model = require('./model.js');
describe("Nurses Test", function() {
    var nurse;
  
    beforeEach(function() {
      nurse = new model.Nurse("Ana", {L: "M", M:"M", X:"T"});
    });

    it("Initially, Nurse has a name and a simple schedule", function() {
        expect(nurse.name).toBeDefined();
        expect(nurse.schedule).toBeDefined();
    });
});
  