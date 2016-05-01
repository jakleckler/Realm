app.controller("RealmController", ["$scope", "$state", "$http", "AuthenticationService", function($scope, $state, $http, AuthenticationService) {
	var token;

	$scope.user = {
		firstName: undefined,
		lastName: undefined,
		username: undefined,
		email: undefined
	};

	if (localStorage["token"]) {
		token = JSON.parse(localStorage["token"]);
	} else {
		token = "notoken";
	}
	AuthenticationService.checkToken(token);

	$scope.profile = function() {
		$state.go("profile");
	};

	$scope.loadProfile = function() {
		var data = {
			token: token
		};

		$http.post("assets/php/profile.php", data).success(function(response) {
			$scope.user.firstName = response[0].FIRSTNAME;
			$scope.user.lastName = response[0].LASTNAME;
			$scope.user.username = response[0].username;
			$scope.user.email = response[0].email;
		}).error(function(error){
			console.error(error);
			$state.go("login");
		});
	}();

	$scope.logout = function() {
		var data = {
			token: token
		};

		$http.post("assets/php/logout.php", data).success(function(response) {
			console.log(response);
			localStorage.clear();
			$state.go("login");
		}).error(function(error) {
			console.error(error);
		});
	};
	
	$scope.message = {
		title: undefined,
		information: undefined
	};

	$scope.search = {
		title: undefined,
		information: undefined

	};

	$scope.saveInformation = function() {
		var data = {
			token: token,
			title: $scope.message.title,
			information: $scope.message.information
		};

		$http.post("assets/php/saveInformation.php", data).success(function(response) {
			console.log(response);
			$scope.message.title = undefined;
			$scope.message.information = undefined;
		}).error(function(error) {
			console.error(error);
		});
	};

	$scope.retrieveInformation = function() {
		var data = {
			username: $scope.user.username,
			title: $scope.search.title
		};
		$scope.search.information = "";
		$http.post("assets/php/retrieveInformation.php", data).success(function(response) {
			$scope.search.information = response;
			console.log(response);
		}).error(function(error) {
			console.error(error);
		});
	};

	$scope.openItem = function(info) {
		var data = {
			token: token,
			itemID: info.itemID
		};

	};

	$scope.deleteItem = function(info) {
		var data = {
			token: token,
			infoID: info.infoID
		};
		$http.post("assets/php/deleteInfo.php", data).success(function(response) {
			console.log(response);
			$scope.retrieveInformation();
		}).error(function(error) {
			console.error(error);
		});
	};
}]);