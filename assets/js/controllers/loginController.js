app.controller("LoginController", ["$scope", "$http", "$state", function($scope, $http, $state) {
	
	$scope.registration = {
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		username: undefined,
		password: undefined,
		checkPass: undefined
	};

	$scope.login = {
		username: undefined,
		password: undefined
	};

	$scope.registerUser = function() {
		var data = {
			firstName: $scope.registration.firstName,
			lastName: $scope.registration.lastName,
			email: $scope.registration.email,
			username : $scope.registration.username,
			password : $scope.registration.password,
			checkPass : $scope.registration.checkPass,
			access: 0

		};

		$http.post("assets/php/register.php", data).success(function(response) {
			console.log(response);
			localStorage.setItem("token", JSON.stringify(response));
			$scope.registration.firstName = undefined;
			$scope.registration.lastName = undefined;
			$scope.registration.email = undefined;
			$scope.registration.username = undefined;
			$scope.registration.password = undefined;
			$scope.registration.checkPass = undefined;
			$state.go("login");
		}).error(function(error) {
			console.log(error);
		});
	};

	$scope.loginUser = function() {
		var data = {
			username: $scope.login.username,
			password: $scope.login.password
		};

		$http.post("assets/php/login.php", data).success(function(response) {
			console.log(response);
			localStorage.setItem("token", JSON.stringify(response));
			$state.go("realm");
		}).error(function(error) {
			console.log(error);
		});
	};

	console.log("Login Controller setup");
}]);