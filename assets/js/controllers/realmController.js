app.controller("RealmController", ["$scope", "$state", "$http", "AuthenticationService", function($scope, $state, $http, AuthenticationService) {
	var token;
	if (localStorage["token"]) {
		token = JSON.parse(localStorage["token"]);
	} else {
		token = "notoken";
	}
	AuthenticationService.checkToken(token);

	$scope.profile = function() {
		$state.go("profile");
	};

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
		}).error(function(error) {
			console.error(error);
		});
	};

	$scope.retrieveInformation = function() {
		var data = {
			token: token,
			title: $scope.search.title
		};
		$scope.search.information = "";
		$http.post("assets/php/retrieveInformation.php", data).success(function(response) {
			var i = 0;
			while (i < response.length) {
				$scope.search.information += response[i].information + "\r\n";
				i++;
			}
			console.log(response);
		}).error(function(error) {
			console.error(error);
		});
	};
}]);