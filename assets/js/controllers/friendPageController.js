app.controller("FriendPageController", ["$scope", "$http", "$state", "profileService", function($scope, $http, $state, profileService) {
	$scope.friend = {
		username: undefined,
		FIRSTNAME: undefined,
		LASTNAME: undefined
	};

	$scope.user = {};

	if (localStorage["friend"]) {
		$scope.user = JSON.parse(localStorage["friend"]);
		$scope.friend.username = $scope.user[0].username;
		$scope.friend.FIRSTNAME = $scope.user[0].FIRSTNAME;
		$scope.friend.LASTNAME = $scope.user[0].LASTNAME;
		console.log($scope.friend);
	} else {
		console.log("No page");
		$state.go("realm");
	}

	$scope.home = function() {
		$state.go("realm");
	};

	$scope.search = {
		title: undefined,
		information: undefined

	};

	$scope.retrieveInformation = function() {
		var data = {
			username: $scope.friend.username,
			title: $scope.search.title
		};
		$scope.search.information = "";
		$http.post("assets/php/retrieveInformation.php", data).success(function(response) {
			$scope.search.information = response;
			$scope.search.title = undefined;
			console.log(response);
		}).error(function(error) {
			console.error(error);
		});
	};
	
}]);