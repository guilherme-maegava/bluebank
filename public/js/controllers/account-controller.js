angular.module('bluebank').controller('AccountController', function($scope, $http){
	$scope.newAccount = {};
	$scope.errorFriendlyMessage = "";
	$scope.successFriendlyMessage = "";

	$scope.clear = function(){
		$scope.newAccount = {};
		$scope.errorFriendlyMessage = "";
		$scope.successFriendlyMessage = "";		
	}

	$scope.create = function(){
		$scope.errorFriendlyMessage = "";
		$scope.successFriendlyMessage = "";
		$http({
			method: 'GET',
			url: 'v1/account/search',
			params: {
				accountNumber: $scope.newAccount.number,
				bankBranch: $scope.newAccount.bankBranch
			}
		}).then(function (res){
			if(res.data != null)
				return errorMessage("Account already exists","Conta já existente");

			var data = {
				bankBranch: $scope.newAccount.bankBranch.toString(),
				number: $scope.newAccount.number.toString(),
				cpf: $scope.newAccount.cpf.toString(),
				balance: $scope.newAccount.balance.toString()
			}

			$http({
				method: 'POST',
				url: 'v1/account/create',
				data: data
			}).then(function(res){
				if(res.data == null)
					return errorMessage("_id: " + res.data,"Erro ao gravar conta no banco");
				
				console.log("New account (_id:"+res.data+") created");
				$scope.successFriendlyMessage = "Conta criada com sucesso";
				$scope.newAccount = {};	
			}, function(err){
				return errorMessage(err,"Erro inesperado do servidor");
			});
		},function(err){
			return errorMessage(err,"Erro inesperado do servidor");
		});	
	}

	errorMessage = function(message, friendlyMessage) {
		$scope.errorFriendlyMessage = friendlyMessage;
		console.log(message);
	}	
});