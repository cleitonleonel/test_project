/**
 * Created by diego on 05/05/2017.
 */
/*if (typeof application === 'undefined' || application === null) {
    var application = angular.module('app', []);
    alert("Criei a variavel application")
}*/

application.controller('login_controller', function($scope, $controller) {
	$controller('base_controller', {$scope: $scope});

	$scope.login = function () {
		var SESSION_PARAMTERS = {};
		SESSION_PARAMTERS['email'] = $scope.email;
		SESSION_PARAMTERS['password'] = $scope.password;

		var data_paramters = SESSION_PARAMTERS//{email: $scope.email, password: $scope.password}

		var validators = function(){
			return true;
		}

		var success_function = function (response){
			var redirect = "/"
			return redirect
		}

		var fail_function = function (response) {
			return $scope.app.notify.error_notify(null, response.message);
		}

		$scope.app.request.request_api("api/authenticate/",data_paramters,validators,success_function,fail_function)
	}
});