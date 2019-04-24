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

	methods: {},
	mounted: function(){},
	template: `
		<div>
			<table :class='classes' style='width:100%;'>
				<tr style='background: #dcdcdc;color:#777;font-size:11px;text-align:center;height:25px;'>
					<td>#</td>
					<td>Tipo</td>
					<td>Documento</td>
					<td>Nome ou razão social</td>
					<td>Nome popular</td>
					<td>Nacionalidade</td>
					<td>Relação</td>
					<td>Atividade</td>
					<td>Situação</td>
					<td>Criação</td>
					<td>Últ. Alteração</td>
				</tr>

				<tr v-if='data.controls.loaded==false' style='font-size: 12px;text-align:center;'>
					<td colspan='11'>Nenhum registro cadastrado.</td>
				</tr>

				<tr v-if='data.controls.loaded' v-for='(entity, index) in data.objects'>
					<td><button class="btn btn-sm btn-primary">Desativar {{index}}</button></td>
					<td>{{entity.name}}</td>
					<td>{{entity.official_doc}}</td>
					<td>{{entity.popular_name}}</td>
					<td>{{entity.nationality}}</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
	`,
});

Vue.component('app_entities_form',{
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
		      <app_select classes='form-control' label='Tipo'  v-model='form.object.type' :options='form.options.entitiy_types' title='Informe o tipo da entidade.'></app_select>
		    </div>

		    <div class='col-lg-2 col-md-6 col-sm-6 col-xs-12'>
		      <template v-if="form.object.nacionality=='BR'">
			      <app_field label="CPF" title="Informe o CPF." classes="form-control" v-model="form.object.official_document" v-if="form.object.type== 'PF'"></app_field>
			      <app_field label="CNPJ" title="Informe o CNPJ." classes="form-control" v-model="form.object.official_document" v-else=""></app_field>
		      </template>

		      <template v-else>
		        <app_field label="Documento oficial" v-model="form.object.official_document" title="Informe um documento oficial (Registro, Passaporte, Certidão..)." classes="form-control"></app_field>
		      </template>
		    </div>

				<div class='col-lg-6 col-md-8 col-sm-12 col-xs-12'>
		      <app_field classes='form-control' label='Nome completo' :value='form.object.name' title='Informe o nome completo.' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Razão social' :value='form.object.name' title='Informe a razão social.' v-else></app_field>
		    </div>

		    <div class='col-lg-2 col-md-4 col-sm-7 col-xs-12'>
		      <app_field classes='form-control' label='Apelido' :value='form.object.popular_name' title='Informe o nome mais comum dessa entidade.' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Nome fantasia' :value='form.object.popular_name' title='Informe o nome mais comum dessa entidade.' v-else></app_field>
		    </div>

		    <div class='col-lg-2 col-md-4 col-sm-5 col-xs-12'>
		      <app_field classes='form-control' label='Data de nascimento' :value='form.object.birthdate_foundation' title='Informe a data de nascimento.' v-if="form.object.type== 'PF'"></app_field>
		      <app_field classes='form-control' label='Data de fundação' :value='form.object.birthdate_foundation' title='Informe a data de fundação.' v-else></app_field>
		    </div>

		    <div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
		      <app_select_multiple classes='form-control' label='Tipo de relação'  v-model='form.object.company_relations' :options='form.options.company_relations' empty="Não definido" title='Selecione os tipos de relações que essa entidade tem com a empresa.'></app_select_multiple>
		    </div>

		    <div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
		      <app_entity_activities classes='form-control' v-model='form.object.company_relations'></app_entity_activities>
		    </div>
		  </div>

	    <div class='row'>
			  <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
			    <app_textarea classes='form-control' label='Comentário'  v-model='form.object.comments' :options='form.options.comments' title='Preencher com alguma informação ou comentários.'></app_textarea>
		    </div>
	    </div>
		</div>
	`,
});

Vue.component('app_entities',{
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
			<app_entities_table :data='data' classes='table-bordered table-hover'></app_entities_table>
			<br>

			<app_entities_form :form='forms.entity'></app_entities_form>
		</div>
	`,
});