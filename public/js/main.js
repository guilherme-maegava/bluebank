angular.module('bluebank', ['ngRoute'])
.config(function($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$routeProvider.when('/transfer', {
		templateUrl: 'views/main.html',
		controller: 'TransferController'
	});

	$routeProvider.when('/accounts', {
		templateUrl: 'views/accounts.html',
		controller: 'AccountsController'
	});

	$routeProvider.when('/new', {
		templateUrl: 'views/createAccount.html',
		controller: 'AccountController'
	});

	$routeProvider.otherwise({
		redirectTo: "/transfer"
	});
});