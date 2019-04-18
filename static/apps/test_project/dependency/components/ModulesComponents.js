Vue.component('app_form_users', {
	mixins: [base_controller],
	props: ['list'],
  data: function () {
    return {
    	object:{
    		name: null,
    		version: null,
				description: null,
				python_version: null,
				django_version: null,
				repository_link: null
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
				scope.errors = response.message;
				success_notify("Operação realizada com sucesso!","");
				scope.list.push(response.object);
				document.getElementById("form_user").reset();
				$('#modal_user').modal('hide');
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			var validate_link = function (){
				var valid_link = validate_git_repository(scope.object.repository_link);
				if (valid_link == false){
					error_notify(null,"Falha na operação","Link inválido.")
					return false;
				}
				return true;

			}

			this.request('/api/dependency/save','post',data_paramters, validate_link, success_function, failure_function);
		},
  },

  template: `
  <div id='modal_user' class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
			<form id="form_user" v-on:submit.prevent>

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
					<h4 class="modal-title" id="myModalLabel">Nova Dependência</h4>
				</div>

				<div class="modal-body">
					<app_field id="name" label="Nome da Dependência" v-model="object.name" :error="errors.name" placeholder="" title="" type="text"></app_field>
					<br>
					<select id="type" label="Tipo" v-model="object.type" :error="errors.type" class='form-control'>
						<option value="BACKEND" selected>Back-end</option>
						<option value="FRONTEND">Front-end</option>
						<option value="TEMPLATE">Template</option>
					</select>
					<div class="row">
						<div class="col-lg-4">
							<app_field id="version" label="Versão" v-model="object.version" :error="errors.version" placeholder="" title="" type="text"></app_field>
						</div>
						<div class="col-lg-4">
							<app_field id="django_version" label="Versão do Django" v-model="object.django_version" :error="errors.django_version" placeholder="2.1" title="" type="text"></app_field>
						</div>
						<div class="col-lg-4">
							<app_field id="python_version" label="Versão do Python" v-model="object.python_version" :error="errors.python_version" placeholder="3.6.5" title="" type="text"></app_field>
						</div>
					</div>
					<app_field id="repository_link" label="Link do Repositório" v-model="object.repository_link" :error="errors.repository_link" placeholder="" title="" type="text"></app_field>
					<app_field id="description" label="Descrição" v-model="object.description" :error="errors.description" placeholder="" title="Informe o seu sobrenome.." type="text"></app_field>
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