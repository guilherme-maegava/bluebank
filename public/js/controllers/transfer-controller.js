angular.module('bluebank').controller("TransferController", function($scope, $http){
	$scope.srcAcc = {};
	$scope.destAcc = {};
	$scope.value = "";
	$scope.errorFriendlyMessage = "";
	$scope.successFriendlyMessage = "";

	var srcAcc = {};
	var destAcc = {};

	$scope.transfer = function() {
		$scope.errorFriendlyMessage = "";
		$scope.successFriendlyMessage = "";

		console.log($scope.srcAcc);
		console.log($scope.destAcc);
		console.log($scope.value);

		$http({
			method: 'GET',
			url: 'v1/account/search',
			params: {
				accountNumber: $scope.srcAcc.number,
				bankBranch: $scope.srcAcc.bankBranch
			}
		}).then(function (res){
			if(res.data == null)
				return errorMessage("Source Account " + $scope.srcAcc.number + " not found", "Conta de Origem não enconrada.");
			
			srcAcc = res.data;
			console.log(srcAcc);

			$http({
				method: 'GET',
				url: 'v1/account/search',
				params: {
					accountNumber: $scope.destAcc.number,
					bankBranch: $scope.destAcc.bankBranch
				}
			}).then(function (res){
				if(res.data == null)
					return errorMessage("Destination Account " + $scope.destAcc.number + " not found", "Conta de Destino não enconrada.");
				
				destAcc = res.data;
				console.log(destAcc);

				if(srcAcc.balance < $scope.value)
					return errorMessage("Source Account " + $scope.srcAcc.number + " doesn't have funds to complete this transaction", "Conta de Origem não possuì saldo suficiente para realizar esta transação.");
			
				$http({
					method: 'PUT',
					url: 'v1/account/transfer',
					params: {
						source: srcAcc._id,
						destination: destAcc._id,
						value: $scope.value
					}
				}).then(function (res){
					if(res.data == null)
						return errorMessage("Error on transaction", "Erro na transferência do valor");

					console.log(res.data);
					$scope.successFriendlyMessage = "Transferência concluída!"
					$scope.srcAcc = {};
					$scope.destAcc = {};
					$scope.value = "";
				},function (err){
					return errorMessage(err, "Erro inesperado");
				});
			},function (err){
				return errorMessage(err, "Erro inesperado");
			});
		},function (err){
			return errorMessage(err, "Erro inesperado");
		});
	}

	errorMessage = function(message, friendlyMessage) {
		$scope.errorFriendlyMessage = friendlyMessage;
		console.log(message);
	}
});