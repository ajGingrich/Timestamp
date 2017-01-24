var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('This is a asdfsdf')
});

app.listen(3000, function () {
    console.log('log this joint')
});