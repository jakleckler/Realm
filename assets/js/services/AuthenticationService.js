app.service("AuthenticationService", ["$http", "$state", function($http, $state) {
	var self = this;
	self.checkToken = function(token) {
		var data = {token: token};
		$http.post("assets/php/checkToken.php", data).success(function(response) {
			if (response === "unauthorized") {
				console.log("unauthorized");
				$state.go("login");
			} else if (response === "authorized") {
				console.log("Loggied in");
				return response;
			}
		}).error(function(error) {
			$state.go("login");
		});
	};
}])