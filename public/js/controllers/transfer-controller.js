angular.module('bluebank').controller("TransferController", function($scope){
	$scope.srcAcc = {};
	$scope.destAcc = {};
	$scope.value = "";

	$scope.transfer = function() {
		console.log("[TRANSFER] Source Account - ag." + $scope.srcAcc);
		console.log("[TRANSFER] Destination Account - " + $scope.destAcc);
		console.log("[TRANSFER] Value to transfer - " + $scope.value);
	}
});