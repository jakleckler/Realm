var app = angular.module('realm', ['ui.router']);
app.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('/', {
		url: '/',
		templateUrl: 'pages/register.html',
		controller: 'LoginController'
		
		})
	console.log("Configured");
	console.log($stateProvider);
}])