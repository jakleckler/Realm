app.controller("RealmController", ["$scope", "$state", "$http", "AuthenticationService", function($scope, $state, $http, AuthenticationService) {
	


	var token = JSON.parse(localStorage["token"]);
	AuthenticationService.checkToken(token);
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
	console.log($state.params);
}]);