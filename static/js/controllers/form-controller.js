var app = new Vue({
  el: '#app_core_authentication',
  mixins: [base_controller],
  data: function() {
    return{
			forms: {
				log_in: {username: null, password: null},
				sign_in: {first_name: null, family_name: null, email: null, username: null, password: null, confirm_password: null}
			},
			errors:{}
    }
  },

  methods: {
		signin: function(){
			var scope = this;
			var data_paramters = scope.forms.sign_in;
			var success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/login";
			};

			var failure_function = function(response){
				scope.errors = response.message;
			};
			this.request('/api/register/save','post',data_paramters, null, success_function, failure_function);
		},

		login: function(){

			var scope = this;
			var data_paramters = scope.forms.log_in;
			alert('look the data_parameters: '+JSON.stringify(data_paramters));
			var success_function = function(response){
			  alert('came at the success_function: '+JSON.stringify(response));
				scope.errors = response.message;
				window.location.href = "/";
			};

			var failure_function = function(response){
				alert('came at the failure_function: '+JSON.stringify(response));
			  scope.errors = response.message;
			};
			this.request('/core/login/api/authenticate/','post',data_paramters, null, success_function, failure_function);
		}
	}
});