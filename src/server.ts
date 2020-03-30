let express = require('express');
let app = express();

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/districts', function(req, res){
    res.sendFile(__dirname + '/public/districts.html');
});

app.get('/zero', function(req, res){
    res.sendFile(__dirname + '/public/zero.html');
});

app.get("*", function(req, res){
    res.status(404).sendFile(__dirname + "/public/404.html"); 
});