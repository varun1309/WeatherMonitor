var app = angular.module('app', ['ngRoute', 'ngResource', 'ngStorage']);

app.factory('Weather', ['$resource', function($resource){
  return $resource('/Weather/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.controller('weatherController', ['$scope', 'Weather', '$http', '$localStorage', '$sessionStorage', function($scope, Weather, $http, $localStorage, $sessionStorage){
	//Page load actions
	$scope.dataArray =[];
	

	if($localStorage.cityList == undefined){
		$localStorage.cityList = [];
	}
	
	$scope.add = function() {
		$localStorage.cityList.push($scope.cityName);
		fetchWeatherRecordsForCity($scope.cityName);
	}

	fetchWeatherRecordsForCity = function(city){
		$http({method: 'GET', url: '/fetch/'+city}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available

		    var temp = data.main.temp - 273.15;
		    var temp_min = data.main.temp_min - 273.15;
		    var temp_max = data.main.temp_max - 273.15;
		    var humidity = data.main.humidity;
		    var windspeed = data.wind.speed;
		    var name = data.name;

		    var json = {
		    	"temp": temp.toFixed(2),
		    	"temp_min": temp_min.toFixed(2),
		    	"temp_max": temp_max.toFixed(2),
		    	"humidity": humidity,
		    	"windspeed": windspeed,
		    	"name": name,
		    	"description": data.weather[0].description
		    };
		    $scope.dataArray.push(json);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log('error');
		  });
	}


	onPageLoad = function(){
		angular.forEach($localStorage.cityList, function(city){
			fetchWeatherRecordsForCity(city);
		})
	};
	onPageLoad();

	
}]);
