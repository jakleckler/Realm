app.controller("ProfileController", ["$scope", "$http", "$state", "AuthenticationService", function($scope, $http, $state, AuthenticationService) {

	$scope.user = {
		firstName: undefined,
		lastName: undefined,
		username: undefined,
		email: undefined
	};

	var token;
	if (localStorage["token"]) {
		token = JSON.parse(localStorage["token"]);
	} else {
		token = "notoken";
	}
	AuthenticationService.checkToken(token);

	$scope.loadProfile = function() {
		var data = {
			token: token
		};

		$http.post("assets/php/profile.php", data).success(function(response) {
			console.log(response);
			$scope.user.firstName = response[0].FIRSTNAME;
			$scope.user.lastName = response[0].LASTNAME;
			$scope.user.username = response[0].username;
			$scope.user.email = response[0].email;
		}).error(function(error){
			console.error(error);
			$state.go("realm");
		});
	}();

	$scope.back = function() {
		$state.go("realm");
	};

	$scope.changePass = {
		username: undefined,
		oldPass: undefined,
		newPass: undefined,
		newPassCheck: undefined
	};


	$scope.changePass = function() {
		var data = {
			token: token,
			username: $scope.changePass.username,
			oldPass:$scope.changePass.oldPass,
			newPass:$scope.changePass.newPass,
			newPassCheck:$scope.changePass.newPassCheck
		}

		$http.post("assets/php/changePass.php", data).success(function(response) {
			console.log(response);
			//show success on page
		}).error(function(error) {
			console.error(error);
		});
	};

	
}]);