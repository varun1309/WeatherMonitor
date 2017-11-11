var express = require('express');
var http = require('http');
var router = express.Router();

var url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e0c683e83253bb4124ab2ac054a09591';

router.get('/', function(req, res, next){

	http.get(url, function(response){
		var body = '';

		response.on('data', function(chunk){
			body = body+ chunk;
		});

		response.on('end', function(){
			// var responseBody = JSON.parse(body);

			res.render('index.html', {'response': body});
		});
	})

});


router.get('/fetch/:city', function(req, res, next){
	var body = req.body;
	var url = 'http://api.openweathermap.org/data/2.5/weather?q='+req.params.city+'+&appid=e0c683e83253bb4124ab2ac054a09591';
	
	http.get(url, function(response){
		var body = '';
		response.on('data', function(chunk){
			body = body+ chunk;
		});

		response.on('end', function(){
			var responseBody = JSON.parse(body);
			res.json(responseBody);
		});
	})

});




module.exports = router;