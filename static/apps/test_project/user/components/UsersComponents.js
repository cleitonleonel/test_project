Vue.component('app_form_users', {
	mixins: [base_controller],
	props: ['list'],
  data: function () {
    return {
    	object:{
    		first_name: null,
				family_name: null,
				email: null,
				username: null,
				password: '1234abcd'
    	},
    	errors:{
    	}
    }
  },
  methods:{
		save: function(){
			var scope = this;
			var data_paramters = scope.object;

			var success_function = function(response){
				//alert('o que rolou?'+JSON.stringify(response.object));
				//alert("OLHA O QUE EU JA TINHA:"+scope.list);
				scope.errors = response.message;
				success_notify("Operação realizada com sucesso!","");
				scope.list.push(response.object);
				document.getElementById("form_user").reset();
				$('#modal_user').modal('hide');
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			var validate_form = function (){
				var valid_email = validate_email(scope.object.email);
				if (valid_email == false){
					error_notify(null,"Falha na operação","Email inválido.")
					return false;
				}
				return true;
			}

			this.request('/api/user/save','post',data_paramters, validate_form, success_function, failure_function);
		},
		upper : function(e){
		  return e.target.value = e.target.value.toUpperCase();
		},
  },


  template: `
  <div id='modal_user' class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
			<form id="form_user" v-on:submit.prevent>

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
					<h4 class="modal-title" id="myModalLabel">Novo usuário</h4>
				</div>

				<div class="modal-body">
					<app_field id="first_name" label="" v-model="object.first_name" @input="object.first_name.toUpperCase()" :error="errors.first_name" placeholder="Primeiro Nome" title="Informe o seu primeiro nome.." type="text" @input="upper($event)"></app_field>
					<app_field id="family_name" label="" v-model="object.family_name" :error="errors.family_name" placeholder="Sobrenome" title="Informe o seu sobrenome.." type="text"></app_field>
					<app_field id="email" label="" v-model="object.email" :error="errors.email" placeholder="e-mail" title="Informe o seu email.." type="text"></app_field>
					<app_field id="username" label="" v-model="object.username" :error="errors.username" placeholder="Nome de usuário" title="Informe o seu usuário.." type="text"></app_field>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button id="button_send" type="submit" class="btn btn-primary btn-sm submit" v-on:click="save">Salvar</button>
				</div>
			</form>
		</div>
  </div>
  `
})