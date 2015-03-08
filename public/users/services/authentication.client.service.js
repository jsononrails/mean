angular.module('users').factory('Authentication', [
	function() {
		this.users = window.user;
		
		return {
			user: this.user
		};
	}
]);