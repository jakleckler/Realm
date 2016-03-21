var app = angular.module("Realm", ["ui.router"]);
app.config(["$stateProvider", function($stateProvider) {
	$stateProvider
		.state("login", {
		url: '/',		
		controller: 'LoginController',
		templateUrl: 'pages/login.html'
		})
	console.log("Configured");
	console.log($stateProvider);
}])