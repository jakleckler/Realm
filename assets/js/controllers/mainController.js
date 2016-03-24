app.controller('MainController', ['$scope', "$state", function($scope, $state) {
	$scope.title = "Realm";

	$scope.contact = function() {
		$state.go("contact");
	}
}])