angular.module('bluebank', ['ngRoute'])
.config(function($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$routeProvider.when('/transfer', {
		templateUrl: 'partials/main.html',
		controller: 'TransferController'
	});

	$routeProvider.otherwise({
		redirectTo: "/transfer"
	});
});