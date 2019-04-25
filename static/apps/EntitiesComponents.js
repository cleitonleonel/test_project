Vue.component('app_disable',{
	props:[],
	methods: {},
	template:
		`
		
		`
});

Vue.component('app_entities_table',{
	mixins: [],
	props: ['classes', 'data'],
	data: function(){
		return {}
	},
	filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY, HH:mm:ss');
    }
  },
	template: `
		<div>
			<div>
				<table :class='classes' style='width:100%;'>
					<tr style='background: #dcdcdc;color:#777;font-size:11px;text-align:center;height:25px;'>
						<td style='text-align:center;width:45px;'>#</td>
						<td style='text-align:center;width:140px;'>Documento</td>
						<td>Nome ou razão social</td>
						<td style='text-align:center;width:120px;'>Nome popular</td>
						<td style='text-align:center;width:160px;'>Relação</td>
						<td style='text-align:center;width:160px;'>Atividade</td>
						<td style='text-align:center;width:60px;'>Status</td>
						<td style='text-align:center;width:135px;'>Criação</td>
						<td style='text-align:center;width:135px;'>Últ. Alteração</td>
						<td style='text-align:center;width:80px;'></td>
					</tr>

					<tr v-if='data.controls.loaded==false' style='font-size: 12px;text-align:center;'>
						<td colspan='11'>Aguarde.. carregando os registros</td>
					</tr>

					<tr v-if='data.controls.loaded==true && data.objects.length==0' style='font-size: 12px;text-align:center;'>
						<td colspan='11'>Nenhum registro cadastrado</td>
					</tr>

					<template v-if='data.objects.length > 0'>
						<tr v-if='data.controls.loaded && entity.status != "DISABLED"' v-for='(entity, index) in data.objects'>
							<td style='text-align:center;width:45px;'>{{ entity.id }}</td>
							<td style='text-align:center;width:140px;'>14.988.231/0001-13</td>
							<td>{{ entity.name }}</td>
							<td style='text-align:left;width:90px;'>{{ entity.popular_name }}</td>
							<td style='text-align:center;width:160px;'>{{ entity.company_relation }}</td>
							<td style='text-align:center;width:160px;'>{{ entity.activities }}</td>
							<td style='text-align:center;width:60px;'>
								<span v-if="entity.commercial_status=='HAB'"><i class="fas fa-check-circle"></i></span>
								<span v-if="entity.commercial_status=='BLO'"><i class="fas fa-ban"></i></span>
								<span v-if="entity.commercial_status=='SUS'"><i class="fas fa-clock"></i></span>
								<span v-if="entity.commercial_status=='DES'"><i class="fas fa-times"></i></span>
								</td>
							<td style='text-align:center;width:135px;'>{{ entity.creation_date | moment }}</td>
							<td style='text-align:center;width:135px;'>{{ entity.last_update | moment }}</td>
							<td style="padding:5px;">
								<div class="btn-group btn-group-xs" role="group" aria-label="...">
								<button @click="edit(index)" type="button" class="btn btn-xs btn-info" title="Editar"><i class="fas fa-edit"></i> </button>
								<button @click="edit(index)" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalExemplo" title="Desativar" style='margin-left: 4px;'> <i class="fas fa-trash-alt"></i></button>
								</div>
							</td>
						</tr>
					</template>
				</table>
			</div>

		</div>
	`,
});

Vue.component('app_entities_form',{
	mixins: [],
	props: ['form', 'callback'],
	data: function(){
		return {

		}
	},

	methods: {
		update_jquery_components: function(){
			$('.selectpicker').selectpicker();
		},
	},
	updated: function(){
		this.update_jquery_components();
	},
	mounted: function(){},
	template: `

		<div>
			errors: {{ form.errors }}
			<div class='row'>
				<div class='col-lg-2 col-md-3 col-sm-4 col-xs-12'>
		      <app_nacionality classes='form-control' v-model='form.object.nationality'></app_nacionality>
		    </div>

		    <div class='col-lg-2 col-md-3 col-sm-4 col-xs-12'>
		      <app_select classes='form-control' label='Tipo'  v-model='form.object.type' :error='form.errors.type' :options='form.options.entitiy_types' title='Informe o tipo da entidade.'></app_select>
		    </div>

		    <div class='col-lg-2 col-md-6 col-sm-4 col-xs-12'>
		      <template v-if="form.object.nationality=='BR'">
			      <app_field label="CPF" title="Informe o CPF." classes="form-control" v-model="form.object.official_document" :error='form.errors.official_document' v-if="form.object.type== 'PF'"></app_field>
			      <app_field label="CNPJ" title="Informe o CNPJ." classes="form-control" v-model="form.object.official_document" :error='form.errors.official_document'  v-else=""></app_field>
		      </template>

		      <template v-else>
		        <app_field label="Documento oficial" v-model="form.object.official_document" :error='form.errors.official_document' title="Informe um documento oficial (Registro, Passaporte, Certidão..)." classes="form-control"></app_field>
		      </template>
		    </div>

				<div class='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
		      <app_field classes='form-control' label='Nome completo' v-model='form.object.name' :error='form.errors.name' title='Informe o nome completo.' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Razão social' v-model='form.object.name' :error='form.errors.name' title='Informe a razão social.' v-else></app_field>
		    </div>

		    <div class='col-lg-2 col-md-4 col-sm-12 col-xs-12'>
		      <app_field classes='form-control' label='Apelido' v-model='form.object.popular_name' :error='form.errors.popular_name' title='Informe o nome mais comum dessa entidade.' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Nome fantasia' v-model='form.object.popular_name' :error='form.errors.popular_name' title='Informe o nome mais comum dessa entidade.' v-else></app_field>
		    </div>

		    <div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'>
		      <app_field classes='form-control' type='date' label='Data de nascimento' v-model='form.object.birthdate_foundation' :error='form.errors.birthdate_foundation' title='Informe a data de nascimento.' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' type='date' label='Data de fundação' v-model='form.object.birthdate_foundation' :error='form.errors.birthdate_foundation' title='Informe a data de fundação.' v-else></app_field>
		    </div>

				<div class='col-lg-2 col-md-4 col-sm-6 col-xs-12'>
		      <app_select classes='form-control' label='Status comercial' v-model='form.object.commercial_status' :error='form.errors.commercial_status' :options='form.options.commercial_status' title='Informe o status comercial da entidade.'></app_select>
		    </div>

		    <div class='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
		      <app_select_multiple classes='form-control' label='Tipo de relação' v-model='form.object.company_relations' :options='form.options.company_relations' empty="Não definido" title='Selecione os tipos de relações que essa entidade tem com a empresa.'></app_select_multiple>
		    </div>

		    <div class='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
		      <app_entity_activities classes='form-control' v-model='form.object.activities'></app_entity_activities>
		    </div>
		  </div>

	    <!--<div class='row'>
			  <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
			    <app_textarea classes='form-control' label='Comentário'  v-model='form.object.comments' :options='form.options.comments' title='Preencher com alguma informação ou comentários.'></app_textarea>
		    </div>
	    </div>-->

			<br>

	    <div class='row' style='float:right;'>
			  <div class='col-lg-2 col-md-2 col-sm-2 col-xs-12'>
			    <button type="button" class="btn btn-primary" @click="callback()">Salvar</button>
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

Vue.component('app_entities',{
	mixins: [base_controller],
	props: [],
	data: function(){
		return {
			data: {
				objects: [],
				selected: {object: null, index: null, backup: null},
				controls: {loaded: false}
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

						commercial_status:[
							{'value': 'HAB', 'label':'Habilitado'},
							{'value': 'BLO', 'label':'Bloqueado'},
							{'value': 'SUS', 'label':'Suspenso'},
							{'value': 'DES', 'label':'Desativado'},
						],
					},
					controls: {
						is_update: false,
					},

					object: {
		        nationality: "BR",
		        type: "PJ",
		        name: "",
		        popular_name: "",
		        official_document: "",
		        birthdate_foundation: "",
		        commercial_status: "HAB",
		        company_relations: [],
		        activities: [],
		      },
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
        scope.data.controls.loaded = true;
      };

      let failure_function = function(response) {
        //scope.errors = response.message;
        //scope.entities.loaded = null;
        alert('erro')
      };

      this.request('/api/entity/all/', 'get', data_paramters, null, success_function, failure_function);
    },

    save: function(){
			let scope = this;
      let data_paramters = scope.forms.entity.object;
      let success_function = function(response) {
        //alert("VEEIO: "+JSON.stringify(response))
        if(response.result){
          alert('ae.. tudo certo pra incluir')
          scope.forms.entity.errors = {};
        }
        else{
          scope.forms.entity.errors = response.message;
        }
        //scope.forms.entity.object; = response.object;
        //scope.data.controls.loaded = true;
      };

      let failure_function = function(response) {
        scope.forms.entity.errors = response.message;

        //scope.errors = response.message;
        //scope.entities.loaded = null;
        alert('erro')
      };

      this.request('/api/entity/save/', 'post', data_paramters, null, success_function, failure_function);
    },

    open: function(){},
    init_formulary: function(){
      this.forms.entity.object = {
        nationality: "BR",
        type: "PJ",
        name: "",
        popular_name: "",
        official_document: "",
        birthdate_foundation: "",
        commercial_status: "HAB",
        company_relations: [],
        activities: [],


      }
    },
	},

	mounted: function(){
		this.load();
		this.init_formulary();
	},
	template: `
		<div>
			<a class="dropdown-item otma-fs-14" href="#" data-toggle="modal" data-target="#modal_entity">Adicionar</a>
			<app_entities_table :data='data' classes='table_entities table-bordered table-hover'></app_entities_table>

			<app_modal id="modal_entity">
			  <template v-slot:title>
			    <h5>Adicionar entidade</h5>
			  </template>

			  <template v-slot:content>
			    <app_entities_form :form='forms.entity' :callback='save'></app_entities_form>
			  </template>
			</app_modal>
		</div>
	`,
});