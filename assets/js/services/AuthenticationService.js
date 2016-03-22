app.service("AuthenticationService", ["$http", function($http) {
	var self = this;
	self.checkToken = function(token) {
		var data = {token: token};
		$http.post("assets/php/checkToken.php", data).success(function(response) {
			if (response === "unauthorized") {
				$state.go("login");
			} else {
				console.log("Loggied in");
				return response;
			}
		}).error(function(error) {
			$state.go("login");
		});
	};
}])