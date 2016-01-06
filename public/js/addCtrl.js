//creates the addCtrl Module and Controller. Note that it depends on the geolocation module and service

var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice) {

  //Initializes Variables

  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  // Set initial coords to Charleston
  $scope.formData.latitude = 32.7843262;
  $scope.formData.longitude = -79.9491118;

  //functions

  //creates a new user based on the form fields
  $scope.createUser = function() {


    //grabs all of the text box fields
    var userData = {
      username: $scope.formData.username,
      gender: $scope.formData.gender,
      age: $scope.formData.age,
      favlang: $scope.formData.favlang,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified
    };

    //saves the user data to the db
    $http.post('/users', userData)
      .success(function(data) {

        //once complete, clear the form (except location)
        $scope.formData.username = "";
        $scope.formData.gender = "";
        $scope.formData.age = "";
        $scope.formData.favlang = "";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });


  };


});
