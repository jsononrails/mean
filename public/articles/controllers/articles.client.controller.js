/*
	Filename: Articles Controller
	Created by: Jason McBride jsononrails@gmail.com
	Date: 2015-04-07
	
	Purpose:
		Provides client side CRUD access to API endpoints

*/

// controller constructor
// setup dependency injection for controller
angular.module('articles').controller('ArticlesController',
['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
function($scope, $routeParams, $location, Authentication, Articles) {

	$scope.authentication = Authentication;
	
	
	// create action
	$scope.create = function() {

		var article = new Articles({

			title: this.title,
			content: this.content

		});

		article.$save(function(response) {

			$location.path('article/' + response._id);
			console.log('redirect from create');
		}, function(errorResponse) {

			$scope.error = errorResponse.data.message;

		});

	};

	// list action
	$scope.find = function() {

		$scope.articles = Articles.query();

	};

	// load  article action
	$scope.findOne = function() {

		$scope.article = Articles.get({

			articleId: $routeParams.articleId

		});

	}

	// update action
	$scope.update = function() {

		$scope.article.$update(function() {

			$location.path('articleId/' + $scope.article._id);

		}, function(errorResponse) {

			$scope.error = errorResponse.data.message;

		});

	};

	// delete action
	$scope.delete = function(article) {
	
		if(article) {
			
			article.$remove(function() {

				for(var i in $scope.articles) {

					if($scope.articles[i] === article) {

						$scope.articles.splice(i, 1);

					}

				}

			});

		} else {

			$scope.article.$remove(function() {

				$location.path('articles');

			});

		}

	};
}]);
