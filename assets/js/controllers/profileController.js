app.controller("ProfileController", ["$scope", "$http", "$state", "AuthenticationService", "EmailService", function($scope, $http, $state, AuthenticationService, EmailService) {

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
	};
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
			oldPass: $scope.changePass.oldPass,
			newPass: $scope.changePass.newPass,
			newPassCheck: $scope.changePass.newPassCheck
		};

		var email = {
			to: $scope.user.email,
			subject: "Changed Password",
			message: "The password for " + $scope.user.username + " has been changed.  If this was not you, please contact customer support",
			headers: undefined,
			paramters: undefined
		};

		$http.post("assets/php/changePass.php", data).success(function(response) {
			if (response === "success") {
				console.log(response);
				//show success on page	
				EmailService.sendEmail(email, false);
			} else {
				//show failure on page
				console.log(response);
			}		
		}).error(function(error) {
			console.error(error);
		});
	};

	
}]);