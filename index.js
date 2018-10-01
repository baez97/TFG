var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp();

var model = require("./server/model.js");

var service = new model.Service([nurse_1, nurse_2]);
var turn_1     = new model.Turn("03/06/2018", "M");
var turn_2     = new model.Turn("04/06/2018", "T");
var schedule_1 = new model.Schedule([turn_1]);
var schedule_2 = new model.Schedule([turn_2]);
var nurse_1    = new model.Nurse(1, "Ana",   schedule_1, service);
var nurse_2    = new model.Nurse(2, "Marce", schedule_2, service);
var purposal   = new model.Purposal(nurse_1, turn_2);

app.get("/", function(request, response) {
    var json = { nurse1: nurse_1 };
    response.send(json);
});

console.log("Servidor escuchando en "+host+" "+port);
app.listen(port, host);




