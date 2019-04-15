Vue.component('app_form_login', {
	mixins: [base_controller],
	props:['form'],
	methods:{
		login: function(){
			let scope = this;
			let data_paramters = scope.form.object;
			let success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/";
			};

			let failure_function = function(response){
				scope.form.errors = response.message;
				for (let error in scope.form.errors){
					error_notify(null,"Falha na operação!",scope.form.errors[error]);
				}
			};

			let validation_function = function () {
				let result = true;
				let error_keys = {'username' : 'usuário', 'password' : 'senha'};
				for(let field in data_paramters){
					if(!data_paramters[field]){
						error_notify(null,"Falha na operação!","O campo de "+error_keys[field]);
						result = false;
					}
				}
				return result;
			};

			this.request('/core/login/api/authenticate/','post', data_paramters, validation_function, success_function, failure_function);
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
			let scope = this;
			let data_paramters = scope.form.object;
			let success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/";
			};

			let failure_function = function(response){
				scope.form.errors = response.message;
			};

      let validation_function = function () {
        let result = true;
        let error_keys = {'first_name' : 'primeiro nome', 'family_name' : 'sobrenome', 'email' : 'e-mail', 'username' : 'usuário', 'password' : 'senha', 'confirm_password' : 'confirmação de senha', 'activation_code' : 'chave de autorização'};
        for(let field in data_paramters){
          if(!data_paramters[field]){
            error_notify(null,"Erro!","O campo de "+error_keys[field]+" é obrigatório");
            result = false;
          }
        }
        if(!validate_password(data_paramters.password)) {
          error_notify(null,"Senha inválida","Confira se sua senha tem mais de 8 caracteres, e contém letras e números");
          result = false;
        }
        if(!validate_confirm_password(data_paramters.password,data_paramters.confirm_password)) {
          error_notify(null,"Confirmação de senha inválida","Confira se sua senha é igual a confirmação");
          result = false;
        }
        if(!validate_email(data_paramters.email)) {
          error_notify(null,"E-mail inválido","Confira se seu e-mail foi digitado corretamente");
          result = false;
        }
        return result;
      };

			this.request('/core/login/api/register/save','post',data_paramters, validation_function, success_function, failure_function);
		},
	},
	template:
		`
  <div>
    <app_field label='Primeiro Nome' type="text" classes="form-control" v-model="form.object.first_name"></app_field>

	  <app_field label='Sobrenome' type="text" classes="form-control" v-model="form.object.family_name"></app_field>

	  <app_field label='Email' type="email" classes="form-control" v-model="form.object.email"></app_field>

	  <app_field label='Login' type="text" classes="form-control" v-model="form.object.username"></app_field>

	  <app_field label='Senha' type="password" classes="form-control" v-model="form.object.password"></app_field>

	  <app_field label='Confirme a senha' type="password" classes="form-control" v-model="form.object.confirm_password"></app_field>

	  <app_field label='Chave de autorização' type="text" classes="form-control" v-model="form.object.activation_code"></app_field>
	  <br>

	  <app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='signup'></app_button>
  </div>
  `
	,
});

Vue.component('app_form_change_password', {
  mixins: [base_controller],
  props:['form'],
  methods:{
    login: function(){
      let scope = this;
      let data_paramters = scope.form.object;
      let success_function = function(response){
        scope.errors = response.message;
        window.location.href = "/";
      };

      let failure_function = function(response){
        scope.form.errors = response.message;
      };

      let validation_function = function () {
        let result = true;
        let error_keys = {'old_password':'senha antiga', 'password':'senha', 'confirm_password':'confirmação de senha'};
        for(let field in data_paramters){
          if(!data_paramters[field]){
            error_notify(null,"Erro!","O campo de "+error_keys[field]+" é obrigatório");
            result = false;
          }
        }
        if(!validate_password(data_paramters.password)) {
          error_notify(null,"Senha inválida","Confira se sua senha tem mais de 8 caracteres, e contém letras e números");
          result = false;
        }
        if(!validate_confirm_password(data_paramters.password,data_paramters.confirm_password)) {
          error_notify(null,"Confirmação de senha inválida","Confira se sua senha é igual a confirmação");
          result = false;
        }
        return result;
      };

      this.request('/core/change_password','post',data_paramters, validation_function, success_function, failure_function);
    },
  },
  template:
      `
  <div>
	  <app_input type="password" placeholder="Senha Atual" classes="form-control" v-model="form.object.old_password"></app_input>
	  <div style='height: 10px;'></div>
	  <app_input type="password" placeholder="Sua nova Senha" classes="form-control" v-model="form.object.password"></app_input>
	  <app_input type="password" placeholder='Confirme a senha' classes="form-control" v-model="form.object.confirm_password"></app_input>
	  <app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='login'></app_button>
  </div>
  `
  ,
});
