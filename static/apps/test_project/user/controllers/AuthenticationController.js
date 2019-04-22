var app = new Vue({
  el: '#app',
  mixins: [base_controller],
  data: {
  	object: {
			first_name: null,
			family_name: null,
			email: null,
			username: null,
			password:null,
			confirm_password:null,
    },
    errors:{
    }
  },

  methods: {
		register: function(){
			var scope = this;
			var data_paramters = scope.object;
			var success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/login";
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}
			this.request('/api/register/save','post',data_paramters, null, success_function, failure_function);
		},

		login: function(){

			var scope = this;
			var data_paramters = scope.object;
			var success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/";
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}
			this.request('/api/login/save','post',data_paramters, null, success_function, failure_function);
		},
	}
})