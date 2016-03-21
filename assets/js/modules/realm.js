var app = angular.module("Realm", ["ui.router"]);
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state("login", {
			url: "/",
			templateUrl: "pages/login.html",		
			controller: "LoginController"		
		})
		.state("realm", {
			url: "/realm",
			templateUrl: "pages/realm.html",
			controller: "RealmController"
		});
	console.log("Configured");
	console.log($stateProvider);
}]);
app.run(["$state", function($state) {
	$state.go("login");
}]);