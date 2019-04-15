/**
 * Created by diego on 06/06/2018.
 */
var application = angular.module('app', []);

application.controller('notify_controller', function($scope) {

	$scope.config = {};
	$scope.config.TITLE_SUCCESS = "Operação realizada com sucesso";
	$scope.config.TITLE_ERROR = "Falha na operação";

	$scope.config.TIME_SUCCESS = 4000;
	$scope.config.TIME_ERROR = 5000;

	$scope.config.WIDTH_MODAL = "400px";


	$scope.notify = function (type,title,description){
		try{
			new PNotify({
				title: title,
				text: description,
				width: $scope.config.WIDTH_MODAL,
				hide: type=='confirm' ? false : true,
				delay: type=='error' ? $scope.config.TIME_ERROR : $scope.config.TIME_SUCCESS,
				mouse_reset: false,
				type: type=='confirm' ? 'success' : type,
				styling: 'bootstrap3' // bootstrap3 , fontawesome
			});
		}
		catch (erro){
			alert(title+"\n"+description);
		}
		return (type=='error' ? false : true);
	}


	$scope.info_notify = function(title,description){
		return $scope.notify("info",title,description);
	}

	$scope.success_notify = function(message){
		var title = $scope.config.TITLE_SUCCESS;
		return $scope.notify("success",title,description);
	}

	$scope.confirm_notify = function(title, description){
		return $scope.notify("confirm",title,description);
	}

	$scope.error_notify = function(id, message){
		var title = $scope.config.TITLE_ERROR;

		var message = message;

		if (message instanceof Array) {
			$.each(message, function( index, value ) {
				$scope.notify("error",title,message);
			});
		} else {
			if(typeof message === "object"){
				for (var key in message) {
					if (message.hasOwnProperty(key)) {
						//$scope.notify("error",title,key+": "+message[key]);
						$scope.show_field_error(key,message[key]);
						try{
							document.getElementById(key).focus();
						}
						catch(err){
						}
					}
				}
			}
			else{
				$scope.notify("error",title,message);
				if(id!=null){
					document.getElementById(id).focus();
				}
			}
		}
		return false;
	}

	$scope.warning_notify = function(id,title,description){
		document.getElementById(id).focus();
		return $scope.notify("warning",title,description);
	}

	$scope.show_field_error = function(id, message){
		var field = document.getElementById(id);
		var parent_field = field.parentElement;
		if($("#error_"+id).length){
			$("#error_"+id).text(message);
		}
		else{
			var sub = document.createElement("sub");
			var label_error = document.createElement("label");
			label_error.setAttribute('class', 'label_error');
			label_error.setAttribute('id', 'error_'+id);
			label_error.innerHTML = message;
			sub.appendChild(label_error);
			parent_field.insertBefore(sub, field.nextSibling);
		}
	}
});

application.controller('report_controller', function($scope) {

	$scope.report_request_page = function(status){
	}

	$scope.report_request_service = function(status){
	}

	$scope.report_request_failure = function(status){
	}
});

application.controller('request_controller', function($scope) {
	$scope.config = {};
	$scope.config.USE_PROGRESS = false;
	$scope.config.USE_NOTIFY = false;
	$scope.config.REPORT_STATISTICS = false;

	$scope.csrf_token = null;

	$scope.diz_ai = function(){
		alert("AIIAIAI");
	}

	$scope.get_csrftoken = function(){
		if ($scope.csrf_token == null){
			$scope.csrf_token = jQuery("[name=csrfmiddlewaretoken]").val();
		}
		return $scope.csrf_token;
	}

	$scope.start_progress = function(){
		if($scope.config.USE_PROGRESS){
			NProgress.start();
		}
	}

	$scope.end_progress = function(){
		if($scope.config.USE_PROGRESS){
			NProgress.done();
		}
	}

	$scope.default_error_function = function(response){
		var message = response['message']
		if (message instanceof Array) {
			$.each(message, function( index, value ) {
				$scope.error_notify(value);
			});
		} else {
			$scope.error_notify(message);
		}
	}

	$scope.execute_ajax = function (url,request_method,data_paramters,success_function,fail_function){
		var start_request = Date.now();
		$.ajax({
			type: request_method,
			url: url,
			data: data_paramters,
			success: function(data) {
				var response = $.parseJSON(data);
				if (response.result == true) {
					if (success_function != null) {
						var redirect = success_function(response);
						if(redirect!=null){
							windows.location = redirect;
						}
					}
				}

				else{
					if (fail_function != null) {
						fail_function(response);
					}
					else{
						$scope.default_error_function(response);
					}
				}

				if ($scope.config.REPORT_STATISTICS==true){
					$scope.report_request_service(response)
				}

				$scope.end_progress();
				return true;
			},
			failure: function(data){
				$scope.error_notify("Falha na requisição: "+JSON.stringify(data));
				if ($scope.config.REPORT_STATISTICS==true){
					$scope.report_request_service(response)
				}
				$scope.end_progress();
				//register_action(start_request,status.request_path, status.request_size, status.server_processing_time_duration, status.cliente_processing_time_duration)
			}
		});
	}

	$scope.request_api = function request_api(url,data_paramters,validator_functions,success_function,fail_function){
		data_paramters['csrfmiddlewaretoken'] = $scope.get_csrftoken();
		$scope.start_progress();

		if (validator_functions()){
			$scope.execute_ajax(url,'post',data_paramters,success_function,fail_function);
		}
		else{
			$scope.end_progress();
			return false;
		}
	}
});

application.controller('base_controller', function($scope, $controller) {

	$scope.app = {};
	$scope.app.request = {};
	$scope.app.notify = {}
	$scope.app.report = {}


	$controller('request_controller', {$scope : $scope.app.request});
	$controller('report_controller', {$scope : $scope.app.report});
	$controller('notify_controller', {$scope : $scope.app.notify});

	$scope.diz_oi = function(){
		alert("OI")
	}
});