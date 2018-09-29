var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var model = require("./server/model.js");

console.log("Hello friend");
rl.on("line", (answer => {
    console.log(`Thank you for your valuable feedback: ${answer}`);
    rl.close();
}))


