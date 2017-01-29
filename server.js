var express = require('express');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 5000));

//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

var time = {unix: 54150540, natural: 'Jan 1 2017' };

//use middleware

//define routes
//home
app.get('/', function (req, res) {
    res.render('index')
});

//catch the favicon first
app.get('/favicon.ico', function(req, res) {
    res.json(204);
});

var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//new user input routed
app.get('/:id', function (req, res) {
    var inputNumber = parseInt(req.params.id);
    var input = req.params.id;
    var regEx = /(?=.*January|Febuary|March|April|May|June|July|August|September|October|November|December)(?=.*\s\d)(?=.*,\s|\s)(?=.*\d\d\d\d)/i;
    var regexYear = /\d\d\d\d/;
    var regexMonth = /January|Febuary|March|April|May|June|July|August|September|October|November|December/i;
    var regexFecha = /\s\d/;

    var year,
        month,
        fecha,
        dateObj;

    if (typeof inputNumber === "number" && !isNaN(inputNumber)) {
        time.unix = inputNumber;

        //convert unix into DateObject and get values for natural language
        dateObj = new Date(inputNumber);
        year = dateObj.getFullYear();
        month = dateObj.getMonth();
        fecha = dateObj.getDate();


        time.natural = months[month] + " " + fecha + ", " + year;
        //time.natural = dateObj.toDateString();

        //print object
        res.json(time);
    }
    ///here check for natural language date
    else if (regEx.test(input)) {
        year = parseInt(regexYear.exec(input)[0]);
        month = months.indexOf(regexMonth.exec(input)[0].slice(0,1).toUpperCase() + regexMonth.exec(input)[0].slice(1));
        fecha = parseInt(regexFecha.exec(input)[0]);

        dateObj = new Date(year, month, fecha);

        time.unix = dateObj.getTime();
        time.natural = months[month] + " " + fecha + ", " + year;

        res.json(time);
    }
    else {
        time.unix = null;
        time.natural = null;
        res.json(time);
    }

});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});