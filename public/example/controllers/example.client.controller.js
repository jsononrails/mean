angular.module('example').controller('ExampleController', ['$scope', 
	'Authentication',
	function($scope, Authentication) {
		console.log("this " + Authentication);
		$scope.authentication = Authentication;
		console.log($scope);
	}]);