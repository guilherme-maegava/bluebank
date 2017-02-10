angular.module('bluebank').controller("AccountsController", function($scope, $http){
	$scope.accounts = [];

	$http({
		method: "GET",
		url: 'v1/account/list'
	}).then(
		function(res){
			$scope.accounts = res.data;
		},
		function(err){
			console.log(err);
		}
	);
});