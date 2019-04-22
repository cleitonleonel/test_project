Vue.component('app_form_change_password', {
  mixins: [base_controller],
  props:['form'],
  data: function(){
    return {
      fields_keys:{'old_password':'Senha atual', 'password':'Nova senha', 'confirm_password':'Confirmação de senha'},
      error_keys:{'Campo obrigatório':'Campo obrigatório', 'Conteúdo inválido':'Formato inválido! Informe 8 caracteres ou mais contendo letras e numeros.'}
    }
  },

  methods:{
    change_password: function(){
      let scope = this;
      let data_paramters = scope.form.object;
      let success_function = function(response){
        if (response.result==true){
	        scope.form.errors = {};
	        window.location.href = "/";
	      }
      };

      let failure_function = function(response){
        scope.form.errors = response.message;
      };

      let validation_function = function () {
        let result = true;
        for(let field in data_paramters){
          if(!data_paramters[field]){
            scope.form.errors[field] = "Campo obrigatório."
            //error_notify(null,"Falha na operação!","O campo de "+scope.fields_keys[field]+" é obrigatório");
            result = false;
          }
        }
        if(!validate_password(data_paramters.password)) {
          //error_notify(null,"Falha na operação!","Senha precisa ter no minímo 8 caracteres contendo letras e numeros.");
          scope.form.errors["password"] = "Senha precisa ter no minímo 8 caracteres contendo letras e numeros.";
          result = false;
        }
        if(!validate_confirm_password(data_paramters.password,data_paramters.confirm_password)) {
          //error_notify(null,"Falha na operação!","Confirmação de senha está incorreta.");
          scope.form.errors["password"] = "Confirmação de senha incorreta.";
          result = false;
        }
        return result;
      };

      this.request('api/core/authentication/change_password','post',data_paramters, validation_function, success_function, failure_function);
    },
  },
  template:
      `
  <div>
	  <app_field type="password" label="Senha atual" :error="form.errors.old_password" classes="form-control" v-model="form.object.old_password" placeholder="" title="Informe sua senha atual."></app_field>
	  <app_field type="password" label="Nova senha" :error="form.errors.password" classes="form-control" v-model="form.object.password" placeholder="" title="Informe sua senha nova."></app_field>
	  <app_field type="password" label="Confirme a senha" :error="form.errors.confirm_password" classes="form-control" v-model="form.object.confirm_password" placeholder="" title="Informe novamente sua nova senha."></app_field>
	  <br>
	  <app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='change_password'></app_button>
  </div>
  `
  ,
});

Vue.component('app_otma_clock', {
  data: function() {
    return {
      time: null
    }
  },
  methods: {
    get_time: function () {
      this.time = moment().format('HH:mm:ss')
    },
  },
  created: function() {
    this.get_time();
    setInterval(() => this.get_time(), 1 * 1000);
  },
  template:
  `
<div>
<span>{{ time }}</span>  
</div>
  `
});