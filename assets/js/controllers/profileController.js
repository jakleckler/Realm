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
			$scope.findFriends();
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

	$scope.friend = {
		username: undefined,
		list: undefined
	}

	$scope.addFriend = function() {
		var data = {
			token: token,
			username: $scope.user.username,
			friend: $scope.friend.username
		};

		$http.post("assets/php/addFriend.php", data).success(function(response) {
			console.log(response);
			$scope.friend.username = undefined;
			$scope.findFriends();
		}).error(function(error) {
			console.error(error);
		});
	};

	$scope.findFriends = function() {
		var data = {
			token: token,
			username: $scope.user.username
		};

		$http.post("assets/php/findFriends.php", data).success(function(response) {
			console.log(response);
			$scope.friend.list = response;
		}).error(function(error) {
			console.error(error);
		});
	};

	$scope.deleteFriend = function(friendUsername) {
		var data = {
			username: $scope.user.username,
			friendUsername: friendUsername
		};

		$http.post("assets/php/deleteFriend.php", data).success(function(response) {
			console.log(response);
			$scope.findFriends();
		}).error(function(error) {
			console.error(error);
		});
	};

	$scope.acceptFriend = function(friendUsername) {
		var data = {
			username: $scope.user.username,
			friendUsername: friendUsername
		};

		$http.post("assets/php/acceptFriend.php", data).success(function(response) {
			console.log(response);
			$scope.findFriends();
		}).error(function(error) {
			console.error(error);
		});
	};

	
}]);