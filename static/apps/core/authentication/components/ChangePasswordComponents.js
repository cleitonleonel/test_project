Vue.component('app_form_passwd', {
	mixins: [base_controller],
  props:['form'],
  methods:{
    login: function(){
      var scope = this;
			var data_paramters = scope.form.object;
			var success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/";
			};

			var failure_function = function(response){
			  scope.form.errors = response.message;
			};
			this.request('/core/change_password','post',data_paramters, null, success_function, failure_function);
		},
	},
  template:
  `
  <div>
	  <app_input type="password" placeholder="Senha Atual" classes="form-control" v-model="form.object.password"></app_input>
	  <div style='height: 10px;'></div>
	  <app_input type="password" placeholder="Sua nova Senha" classes="form-control" v-model="form.object.new_password"></app_input>
	  <app_input type="password" placeholder='Confirme a senha' classes="form-control" v-model="form.object.confirm_password"></app_input>
	  <app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='login'></app_button>
  </div>
  `
  ,
});

Vue.component('app_form_signup', {
	mixins: [base_controller],
  props:['form'],
  methods:{
    signup: function(){
      var scope = this;
			var data_paramters = scope.form.object;
			var success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/";
			};

			var failure_function = function(response){
			  scope.form.errors = response.message;
			};
			this.request('/core/change_password','post',data_paramters, null, success_function, failure_function);
		},
  },
  template:
  `
  <div>

	  <app_input type="password" placeholder="Senha Atual" classes="form-control" v-model="form.object.password"></app_input>
	  <app_input type="password" placeholder="Sua nova Senha" classes="form-control" v-model="form.object.new_password"></app_input>
	  <app_input type="password" placeholder='Confirme a senha' classes="form-control" v-model="form.object.confirm_password"></app_input>
	  <app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='signup'></app_button>
  </div>
  `
  ,
});