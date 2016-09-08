var app = angular.module('plunker', ['google-maps']);

app.controller('MainCtrl', function($scope, $document) {
    
    // map object
  $scope.map = {
    control: {},
    center: {
        latitude: 42.361145,
        longitude: -71.057083	
    },
    zoom: 14
  };
  
  // marker object
  $scope.marker = {
    center: {
        latitude: 42.361145,
        longitude: -71.057083	
    }
  }
  
  // instantiate google map objects for directions
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  
  // directions object -- with defaults
  $scope.directions = {
    origin: "",
    destination: "",
    showList: false
  }
  // get directions using google maps api
  $scope.getDirections = function () {
    var request = {
      origin: $scope.directions.origin,
      destination: $scope.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) { 
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap($scope.map.control.getGMap());
        directionsDisplay.setPanel(document.getElementById('directionsList'));
        $scope.directions.showList = true;
      } else {
        alert('Google route unsuccesfull!');
      }
    });
  }
});


app.controller('helpController', ['$scope', function ($scope) {
    $scope.show = false;
    $scope.help = function () {
        if ($scope.myButton) {
            $scope.show = true;
        } else($scope.close = function () {
            $scope.show = false;
        });
    }
    }]);

app.controller('weatherController', ['$scope', '$http', function ($scope, $http) {
    var weather = new XMLHttpRequest();
    weather.open("GET", "http://api.wunderground.com/api/fa5715ba5adff2ac/conditions/q/MA/Boston.json", false)
    weather.send(null);

    var r = JSON.parse(weather.response);

    var dis = "Current location: " + r.current_observation.display_location.full + "  <p>";
    var temp = r.current_observation.temperature_string + "  <p>";
    var wind = r.current_observation.wind_string + "  <p>";
    var icon = r.current_observation.icon + "  <p>";



    function getWeather(id, res) {
        document.getElementById(id).innerHTML = res;
    }
    getWeather("weather", dis);
    getWeather("temp", temp);
    getWeather("wind", wind);
    getWeather("icon", icon);
    }]);