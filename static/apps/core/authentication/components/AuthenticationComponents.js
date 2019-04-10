Vue.component('app_form_login', {
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
			this.request('/core/login/api/authenticate/','post',data_paramters, null, success_function, failure_function);
		},
  },
  template:
  `
  <div>
	  <app_input type="text" placeholder="Username ou email.." classes="form-control" v-model="form.object.username"></app_input>
	  <div style='height: 10px;'></div>
	  <app_input type="password" placeholder="Senha.." classes="form-control" v-model="form.object.password"></app_input>

	  <app_button text="Entrar" classes='form-control btn btn-primary' title='Clique aqui para entrar' :callback='login'></app_button>
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
			this.request('/core/login/api/register/save','post',data_paramters, null, success_function, failure_function);
		},
  },
  template:
  `
  <div>
    <app_field label='Primeiro Nome' type="text" classes="form-control" v-model="form.object.first_name"></app_field>

	  <app_field label='Sobrenome' type="text" classes="form-control" v-model="form.object.family_name"></app_field>

	  <app_field label='Email' type="text" classes="form-control" v-model="form.object.email"></app_field>

	  <app_field label='Login' type="text" classes="form-control" v-model="form.object.username"></app_field>

	  <app_field label='Senha' type="text" classes="form-control" v-model="form.object.password"></app_field>

	  <app_field label='Confirme a senha' type="text" classes="form-control" v-model="form.object.confirm_password"></app_field>

	  <app_field label='Chave de autorização' type="text" classes="form-control" v-model="form.object.activation_code"></app_field>
	  <br>

	  <app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='signup'></app_button>
  </div>
  `
  ,
});