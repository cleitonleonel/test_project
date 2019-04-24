Vue.component('app_entities_table', {
	props: ['classes', 'data','form'],
	methods: {
		edit: function (key) {
			let scope = this;
			scope.form.entity.object.index = key;
			scope.form.entity.object.id = scope.data.objects[key].id;
			scope.form.entity.object.type = scope.data.objects[key].type;
			scope.form.entity.object.official_doc = scope.data.objects[key].official_doc;
			scope.form.entity.object.name = scope.data.objects[key].name;
			scope.form.entity.object.popular_name = scope.data.objects[key].popular_name;
			scope.form.entity.object.activities = scope.data.objects[key].activities;
			scope.form.entity.object.company_relation = scope.data.objects[key].company_relation;
			scope.form.entity.object.status = scope.data.objects[key].status;
			scope.form.entity.object.nationality = scope.data.objects[key].nationality;
			scope.form.entity.object.comments = scope.data.objects[key].comments;
		},
	},
	filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY, HH:mm:ss');
    }
  },
	template: `
		<div>
			<table :class='classes' style='width:100%;'>
				<tr style='background: #dcdcdc;color:#777;font-size:11px;text-align:center;height:25px;'>
					<td>Tipo</td>
					<td>CPF/CNPJ</td>
					<td>Nome/Razão Social</td>
					<td>Apelido/Nome Fantasia</td>
					<td>Nacionalidade</td>
					<td>Relação</td>
					<td>Atividade</td>
					<td>Situação</td>
					<td>Criação</td>
					<td>Últ. Alteração</td>
					<td width="10%">#</td>
				</tr>

				<tr v-if='data.controls.loaded==false' style='font-size: 12px;text-align:center;'>
					<td colspan='11'>Nenhum registro cadastrado.</td>
				</tr>

				<tr v-if='data.controls.loaded && entity.status != "DISABLED"' v-for='(entity, index) in data.objects'>
					<td>{{entity.type}}</td>
					<td>{{entity.official_doc}}</td>
					<td>{{entity.name}}</td>
					<td>{{entity.popular_name}}</td>
					<td>{{entity.nationality}}</td>
					<td>{{entity.company_relation}}</td>
					<td>{{entity.activities}}</td>
					<td>{{entity.status}}</td>
					<td>{{entity.creation_date | moment}}</td>
					<td>{{entity.last_update | moment}}</td>
					<td style="padding:5px;">
						<div class="btn-group btn-group-sm" role="group" aria-label="...">
						<button @click="edit(index)" type="button" class="btn btn-info">Editar</button>
						<button @click="edit(index)" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalExemplo">Desativar</button>
						</div>
					</td>
				</tr>
			</table>
			
		</div>
	`,
});

Vue.component('app_entities_form', {
	mixins: [],
	props: ['form'],
	data: function(){
		return {

		}
	},

	methods: {},
	mounted: function(){},
	template: `

		<div>
			<div class='row'>
				<div class='col-lg-2 col-md-3 col-sm-3 col-xs-12'>
		      <app_nacionality classes='form-control' :value='form.object.nacionality'></app_nacionality>
		    </div>

		    <div class='col-lg-2 col-md-3 col-sm-3 col-xs-12'>
		      <app_select classes='form-control' label='Tipo'  v-model='form.object.type' :options='form.options.entitiy_types' title='Informe o tipo da entidade'></app_select>
		    </div>

		    <div class='col-lg-2 col-md-6 col-sm-6 col-xs-12'>
		      <template v-if="form.object.nacionality=='BR'">
			      <app_field label="CPF" title="Informe o CPF" classes="form-control" v-model="form.object.official_doc" v-if="form.object.type== 'PF'"></app_field>
			      <app_field label="CNPJ" title="Informe o CNPJ" classes="form-control" v-model="form.object.official_doc" v-else=""></app_field>
		      </template>

		      <template v-else>
		        <app_field label="Documento oficial" v-model="form.object.official_document" title="Informe um documento oficial (Registro, Passaporte, Certidão..)." classes="form-control"></app_field>
		      </template>
		    </div>

				<div class='col-lg-6 col-md-8 col-sm-12 col-xs-12'>
		      <app_field classes='form-control' label='Nome completo' :value='form.object.name' title='Informe o nome completo' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Razão social' :value='form.object.name' title='Informe a razão social' v-else></app_field>
		    </div>

		    <div class='col-lg-2 col-md-4 col-sm-7 col-xs-12'>
		      <app_field classes='form-control' label='Apelido' :value='form.object.popular_name' title='Informe o nome mais comum dessa entidade' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Nome fantasia' :value='form.object.popular_name' title='Informe o nome mais comum dessa entidade' v-else></app_field>
		    </div>

		    <div class='col-lg-2 col-md-4 col-sm-5 col-xs-12'>
		      <app_field classes='form-control' label='Data de nascimento' :value='form.object.birthdate_foundation' title='Informe a data de nascimento' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Data de fundação' :value='form.object.birthdate_foundation' title='Informe a data de fundação' v-else></app_field>
		    </div>

		    <div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
		      <app_select_multiple classes='form-control' label='Tipo de relação'  v-model='form.object.company_relations' :options='form.options.company_relations' empty="Não definido" title='Selecione os tipos de relações que essa entidade tem com a empresa'></app_select_multiple>
		    </div>

		    <div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
		      <app_entity_activities classes='form-control' v-model='form.object.company_relations'></app_entity_activities>
		    </div>
		  </div>

	    <div class='row'>
			  <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
			    <app_textarea classes='form-control' label='Comentário'  v-model='form.object.comments' :options='form.options.comments' title='Preencher com alguma informação ou comentários'></app_textarea>
		    </div>
	    </div>
		</div>
	`,
});

Vue.component('app_disable_entity', {
	mixins:[base_controller],
	props:['data','form'],
	methods: {
		clean_form: function(){
			let scope = this;
			scope.form.entity.object.index 						= '';
			scope.form.entity.object.id 							= '';
			scope.form.entity.object.type 						= 'PJ';
			scope.form.entity.object.official_doc 		= '';
			scope.form.entity.object.name 						= '';
			scope.form.entity.object.popular_name 		= '';
			scope.form.entity.object.activities 			= '';
			scope.form.entity.object.company_relation = '';
			scope.form.entity.object.status 					= '';
			scope.form.entity.object.nationality 			= 'BR';
			scope.form.entity.object.comments 				= '';
		},

		disable: function(index) {
			let scope = this;
			let data_parameters = {
				object: scope.data.objects[index].id,
				password: scope.form.disable_confirm.password,
				reason: scope.form.disable_confirm.reason
			};

			let success_function = function(response){
				this.success_notify('Entidade desabilitada com sucesso', '');
				scope.data.objects.splice(index,1);
			};

			let failure_function = function(response){

			};

			let validation_function = function(response){
				alert('Soldado ferido, para um pouco');
				return true;
			};

			this.request('/api/entities/disable/', 'post', data_parameters, null, success_function, failure_function)
		},
	},
	template:
	`
	<div class="modal-body">
		<p style="border: 1px solid #ced4da;background: #f5f5f5; border-radius: 5px;padding: 5px;color: #000;">
			<span style="font-size: 1.1em;">Atenção!</span>
			<span style="font-size: 0.8em;">Esta é uma operação de alto risco! Se fizer isto, a entidade não será mais exibida nesta lista! Por isso, pedimos uma confirmação de senha e uma justificativa, que será salva junto com as informações de alteração.</span>
		</p>
		<form autocomplete="off">
			<input autocomplete="false" name="hidden" type="text" style="display:none;">
			<app_field type="password" label="Senha" classes="form-control" v-model="form.disable_confirm.password"></app_field>
			<app_textarea classes='form-control' label='Justificativa'  v-model='form.disable_confirm.reason' title='Qual o motivo de desativar esta entidade?'></app_textarea>
		</form>
		<div class="modal-footer">
			<button type="button" class="btn btn-primary" @click="disable(form.entity.object.index)" data-dismiss="modal">Desativar</button>
		</div>
	</div>
			
		
	
	`
});

Vue.component('app_entities', {
	mixins: [base_controller],
	props: [],
	data: function(){
		return {
			data: {
				objects: [],
				selected: {object: null, index: null, backup: null},
				controls: {loaded: true}
			},

			forms:{
				entity:{
					options:{
						entitiy_types:[
							{'value': 'PF', 'label':'Pessoa Física'},
							{'value': 'PJ', 'label':'Pessoa Jurídica'},
							{'value': 'OP', 'label':'Orgão Público'},
							{'value': 'ONG', 'label':'Organização sem fins lucrativos'},
						],

						company_relations:[
							{'value': 'CLI', 'label':'Cliente'},
							{'value': 'FOR', 'label':'Fornecedor'},
							{'value': 'FUN', 'label':'Funcionário'},
							{'value': 'REP', 'label':'Representante'},
							{'value': 'TRA', 'label':'Transportador'},
							{'value': 'CON', 'label':'Contador'},
							{'value': 'BAN', 'label':'Banco'},
						],
					},

					object:{},
					backup:{},
					errors:{}
				},
				disable_confirm:{
					object:{},
					reason: null,
					password: null
				}
			}
		}
	},

	methods: {
		load: function() {
      let scope = this;
      let data_paramters = {};
      let success_function = function(response) {
        scope.data.objects = response.object;
      };

      let failure_function = function(response) {
        //scope.errors = response.message;
        //scope.entities.loaded = null;
        alert('erro')
      };

      this.request('/api/entities/load/', 'get', data_paramters, null, success_function, failure_function);
    },
    open: function(){},
    init_formulary: function(){
      this.forms.entity.object = {
        type: "PJ",
        nacionality: "BR",
        official_document: "",
        name: "",
        popular_name: "",
      }
    },
	},

	mounted: function(){
		this.load();
		this.init_formulary();
	},
	template: `
		<div>
			<app_entities_table :form="forms" :data='data' classes='table-bordered table-hover text-center'></app_entities_table>
			<br>

			<app_entities_form :form='forms.entity'></app_entities_form>
			
			<div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Desabilitar entidade</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<app_disable_entity :data='data' :form="forms"></app_disable_entity>
					</div>
				</div>
			</div>
		</div>
	`,
});