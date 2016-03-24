app.controller("ContactController", ["$scope", "$state", "EmailService", function($scope, $state, EmailService) {
	$scope.contact = {
		name: undefined,
		email: undefined,
		subject: undefined,
		message: undefined
	};

	$scope.home = function() {
		$state.go("realm");
	};

	$scope.submitRequest = function() {
		var headers = "FROM:"+$scope.contact.email+"\r\n";
		var email = {
			to: "Joseph@kleckdev.com",
			subject: $scope.contact.subject,
			message: $scope.contact.message,
			headers: headers,
			paramters: undefined
		};

		EmailService.sendEmail(email, false);
		//check if email send??

	};

}]);