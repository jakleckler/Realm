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
		})
		.state("profile", {
			url: "/profile",
			templateUrl: "pages/profile.html",
			controller: "ProfileController"
		})
		.state("contact", {
			url: "/contact",
			templateUrl: "pages/contact.html",
			controller: "ContactController"
		})
		.state("friendPage", {
			url: "/friend",
			templateUrl: "pages/friendProfile.html",
			controller: "FriendPageController"
		});
	console.log("Configured");
	console.log($stateProvider);
}]);
app.run(["$state", function($state) {
	$state.go("login");
}]);