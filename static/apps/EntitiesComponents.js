Vue.component('app_entities_table',{
  mixins: [],
  props: ['forms', 'data', 'classes', 'table'],
  data: function(){
    return {
      table_fields: [
        {"tag":"id", "text":"#", "visible":true, "style":"text-align:center;width:45px;color:red;", },
        {"tag":"official_document", "text":"Documento", "visible":true, "style":"text-align:center;width:140px;"},
        {"tag":"name", "text":"Nome ou razão social", "visible":true, "style":""},
        {"tag":"popular_name", "text":"Nome popular", "visible":true, "style":"text-align:center;width:120px;"},
        {"tag":"company_relations", "text":"Relação", "visible":true, "style":"text-align:center;width:160px;"},
        {"tag":"activities", "text":"Atividade", "visible":true, "style":"text-align:center;width:160px;"},
        {"tag":"commercial_status", "text":"Status", "visible":true, "style":"text-align:center;width:60px;"},
        {"tag":"creation_date", "text":"Criação", "visible":true, "style":"text-align:center;width:135px;"},
        {"tag":"last_update", "text":"Últ. alteração", "visible":true, "style":"text-align:center;width:135px;"},
        {"tag":"", "text":"", "visible":true, "style":"text-align:center;width:80px;"},
      ],

		  column_selected: 'name',
		  column_direction:'asc',
    }
  },

	methods: {
		aumentar_fonte: function(){
			const font = this.table.fontSize;
			if (font < 18) {
				this.table.fontSize += 1;
			}
			else {	}
		},

		diminuir_fonte: function(){
			const font = this.table.fontSize;
			if (font <= 9){	}
			else {
				this.table.fontSize -= 1;
			}

		},

		toggle_border: function() {
			const table = this.table.tableBordered;
			this.table.tableBordered = !table
		},

		toggle_strip: function() {
			const table = this.table.tableStriped;
			this.table.tableStriped = !table
		},

		open: function(register, index){
      this.forms.entity.object = JSON.parse(JSON.stringify(register));
      this.forms.entity.backup = register;
      this.forms.entity.index = index;
      $('#get_activities').selectpicker('val', this.forms.entity.object.get_activities);
      $('#get_company_relations').selectpicker('val', this.forms.entity.object.get_company_relations);
      //$('.selectpicker').selectpicker('render');
    },

    select: function(register, index){
      this.forms.disable.object = {
        id: register.id,
        name: register.name,
        official_document: register.official_document,
        reason: "",
        password: "",
      }
      //this.forms.disable.backup = register;
      this.forms.disable.index = index;
  },

    sort: function(tag){
			//alert(this.column_direction);
      //alert("oi");
      if(tag === this.column_selected) {
        this.column_direction = this.column_direction==='asc'?'desc':'asc';
      };
      this.column_selected = tag;


      return this.data.objects.sort((a,b) => {
	      let modifier = 1;
	      if(this.column_direction === 'desc') modifier = -1;
	      if(a[this.column_selected] < b[this.column_selected]) return -1 * modifier;
	      if(a[this.column_selected] > b[this.column_selected]) return 1 * modifier;
	      //this.column_direction= 'desc';
	      return 0;
	    });

    }
  },

	filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY, HH:mm:ss');
    },

    company_relations_label: function(value){
      value = value.replace("'","").replace("'","")
      let company_relations = {
				'CLI': "Cliente",
				'FOR': "Fornecedor",
				'FUN': "Funcionário",
				'REP': "Representante",
				'TRA': "Transporte",
				'CON': "Contador",
				'BAN': "Banco",
			}
      return company_relations[value]
    },

    activity_label: function(value){
      value = value.replace("'","").replace("'","")
      let activities = {
				'COM': "Comércio",
				'SER': "Serviço",
				'IND': "Indústria",
				'IMP': "Importador",
				'EXP': "Exportador",
				'PRO': "Produtor Rural",
				'EXT': "Extravista",
			}
      return activities[value]
    },
  },
	template: `
		<div style="border: 1px solid #eee;box-sizing: border-box;">
			<button @click="aumentar_fonte()">+</button> {{ table.fontSize }}
			<button @click="diminuir_fonte()">-</button>
			<div class="btn-group-sm">
				<button class="btn btn-info" @click="toggle_border()">Borda</button>
				<button class="btn btn-info" @click="toggle_strip()">Listra</button>
			</div>
			<div id="entity-container">
				<table id="entity-table" :class="{'table-striped': table.tableStriped, 'table-bordered': table.tableBordered}" style='width:100%;' :style="{fontSize: table.fontSize + 'px'}">

          <tr style='background: #dcdcdc;color:#777;font-size:11px;text-align:center;height:25px;'>
            <td v-for='field in table_fields' v-if='field.visible' v-bind:style="field.style" @click="sort(field.tag)">
              {{ field.text }} <input type="checkbox" @click="field.visible = false">
            </td>
          </tr>

          <app_cells_table :data="data" :table_fields="table_fields"></app_cells_table>

          <tr v-if='data.controls.loaded==false' style='font-size: 12px;text-align:center;'>
            <td colspan='11'>Aguarde.. carregando os registros</td>
          </tr>

          <tr v-if='data.controls.loaded==true && data.objects.length==0' style='font-size: 12px;text-align:center;'>
            <td colspan='11'>Nenhum registro cadastrado</td>
          </tr>
        </table>
      </div>
    </div>
  `,
});

Vue.component('app_cells_table', {
  mixins:[],
  props:['data', 'table_fields'],
  data: function() {
    return {
      table_cells: [
        {"attribute":"id", "style":"text-align:center;width:45px;",},
        {"attribute":"official_document", "style":"text-align:center;width:140px;",},
				{"attribute":"name", "style":"",},
				{"attribute":"popular_name", "style":"text-align:left;width:90px;",},
				{"attribute":"relation", "style":"text-align:center;width:160px;",},
				{"attribute":"activity", "style":"text-align:center;width:160px;",},
				{"attribute":"status", "style":"text-align:center;width:60px;",},
				{"attribute":"creation_date", "style":"text-align:center;width:135px;",},
				{"attribute":"last_alt", "style":"text-align:center;width:135px;",},
				{"attribute":"buttons", "style":"padding:5px;",},
      ],
    }
  },
  template:
  `
    <tbody>

      <tr v-if='data.objects.length > 0 && data.controls.loaded && entity.status != "DISABLED"' v-for='(entity, tr_index) in data.objects'>
        <td v-for='(cell, td_index) in table_cells' v-if='table_fields[td_index].visible' v-bind:style="cell.style">
          {{ entity[cell.attribute] }}


          <div v-if="cell.attribute=='relations'">
	          <span v-for="(relation,index) in entity.company_relations">
	            {{ relation | company_relations }}<span v-if='index < (entity.company_relations.length-1)' style='padding-right:3px;'>,</span>
	          </span>
          </div>

          <div v-if="cell.attribute=='activity'">
	          <span v-for="(activity,index) in entity.get_activities">
	            {{ activity | activity_label }}<span v-if='index < (entity.get_activities.length-1)' style='padding-right:3px;'>,</span>
	          </span>
          </div>

          <div v-if="cell.attribute=='activity'">
	          <span v-if="entity.commercial_status=='HAB'"><i class="fas fa-check-circle"></i></span>
	          <span v-if="entity.commercial_status=='BLO'"><i class="fas fa-ban"></i></span>
	          <span v-if="entity.commercial_status=='SUS'"><i class="fas fa-clock"></i></span>
	          <span v-if="entity.commercial_status=='DES'"><i class="fas fa-times"></i></span>
          </div>

          <div v-if="cell.attribute=='buttons'">
	          <div class="btn-group btn-group-xs" role="group" aria-label="...">
	            <button @click="open(entity, index)" type="button" class="btn btn-xs btn-info" title="Editar" data-toggle="modal" data-target="#modal_entity"><i class="fas fa-edit"></i></button>
	            <button @click="select(entity, index)" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal_disable_entity" title="Desativar" style='margin-left: 4px;'> <i class="fas fa-trash-alt"></i></button>
	          </div>
          </div>
        </td>
      </tr>

    </tbody>
  `,
  methods: {},
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
		      <app_select_multiple id='get_company_relations' classes='form-control' label='Tipo de relação' v-model='form.object.get_company_relations' :options='form.options.company_relations' empty="Não definido" title='Selecione os tipos de relações que essa entidade tem com a empresa.'></app_select_multiple>
		    </div>

		    <div class='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
		      <app_select_multiple id='get_activities' classes='form-control' label='Tipo de atividade' v-model='form.object.get_activities' :options='form.options.activities' empty="Não definido" title='Selecione os tipos de atividades que essa entidade desempenha.'></app_select_multiple>
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
			scope.form.entity.object.official_document 		= '';
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
				password: scope.form.disable.password,
				reason: scope.form.disable.reason
			};

			let success_function = function(response){
				this.success_notify('Entidade desabilitada com sucesso', '');
				scope.data.objects.splice(index,1);
			};

			let failure_function = function(response){
				this.error_notify("Falha", "A entidade não pôde ser excluída")
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
			<app_field type="password" label="Senha" classes="form-control" v-model="form.disable.password"></app_field>
			<app_textarea classes='form-control' label='Justificativa'  v-model='form.disable.reason' title='Qual o motivo de desativar esta entidade?'></app_textarea>
		</form>
		<div class="modal-footer">
			<!--<button type="button" class="btn btn-primary" @click="disable(form.entity.object.index)" data-dismiss="modal">Desativar</button>-->
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

			table_styles: {
				fontSize: 12,
				tableBordered: true,
				tableStriped: false,
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

						activities:[
							{'value': 'COM', 'label':'Comércio'},
							{'value': 'SER', 'label':'Serviço'},
							{'value': 'IND', 'label':'Indústria'},
							{'value': 'IMP', 'label':'Importador'},
							{'value': 'EXP', 'label':'Exportador'},
							{'value': 'PRO', 'label':'Produtor Rural'},
							{'value': 'EXT', 'label':'Extravista'},
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

		        get_company_relations: [],
		        get_activities: [],
		      },
					backup:{},
					errors:{}
				},

				disable:{
					object:{
						id: null,
						reason: '',
						password: '',
					},

					errors: {},
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
			let is_update = false;
			scope.forms.entity.object.company_relations = scope.forms.entity.object.get_company_relations;
			scope.forms.entity.object.activities = scope.forms.entity.object.get_activities;
      let data_paramters = scope.forms.entity.object;

      if(scope.forms.entity.object.id){
        is_update = true;
      }
      let success_function = function(response) {
        if(response.result){
          $('#modal_entity').modal('hide');
          scope.forms.entity.errors = {};
          if(is_update){
            Vue.set(scope.data.objects, scope.forms.entity.object.index, response.object);
            //scope.$emit('update_object', scope.forms.entity.object.index, response.object)
          }
          else{
            scope.data.objects.push(response.object);
          }
          $('#modal_entity').modal('hide');
          scope.init_formulary();
        }
        else{
          scope.forms.entity.errors = response.message;
        }
      };

      let failure_function = function(response) {
        scope.forms.entity.errors = response.message;
      };

	    let validation_function = function () {
	    	//alert('DATA: ' + JSON.stringify(data_paramters));
	    	//console.lg('validando, pera aí');
				if (data_paramters.type === 'PF') {
					//console.log('OFFICIAL_DOC' + JSON.stringify(data_paramters.official_document));
					//let strCpf = data_paramters.official_document;
					if (!validate_cpf(data_paramters.official_document)) {
							alert("Seu CPF é inválido!!!");
							return;
					} else {
						alert("Seu CPF é válido!!!");
					}
          if (!validate_name(data_paramters.name)){
             alert("Digite um nome válido.")
             return;
          }

          if (!validate_data(data_paramters.birthdate_foundation)){
             alert("Data Inválida!!!")
             return;
          } else {
             alert("Data está ok!!!")
          }

        }

        if (data_paramters.type === 'PJ') {
            console.log('OFFICIAL_DOC' + JSON.stringify(data_paramters.official_document));
            //let strCnpj = data_paramters.official_document;
            if (!validate_cnpj(data_paramters.official_document)) {
                alert("Seu CNPJ é inválido!!!");
                return;
            } else {
              alert("Seu CNPJ é válido!!!");
            }

            if (!validate_name(data_paramters.name)){
             alert("Digite um nome valido")
             return;
            }

        }


        return true;
			};
      this.request('/api/entity/save/', 'post', data_paramters, validation_function, success_function, failure_function);
    },

		disable: function(object, index) {
			let scope = this;
			let data_parameters = scope.forms.disable.object;
			let success_function = function(response){
				Vue.set(scope.data.objects, index, response.object);
				success_notify('Operação realizada com sucesso!', '');
				$('#modal_disable_entity').modal('hide');
			};

			let failure_function = function(response){
				scope.forms.disable.errors = response.message;
			};

			let validation_function = function(response){
				return true;
			};

			this.request('/api/entity/disable/', 'post', data_parameters, null, success_function, failure_function)
		},

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
        get_company_relations: [],
        get_activities: [],
      }
    },

    update_object: function(index, object){
     let scope = this;
     //scope.data.objects[index] = object;
     Vue.set(scope.data.objects, index, object);
     alert('troquei');
    }
	},

	mounted: function(){
		this.load();
		this.init_formulary();
	},
	template: `
		<div>
			<a class="dropdown-item otma-fs-14" href="#" data-toggle="modal" data-target="#modal_entity" @click='init_formulary()'>Adicionar</a>

			<app_entities_table :forms='forms' :data='data' classes='table_entities table-hover' :table="table_styles"></app_entities_table>

			<app_modal id="modal_entity" classes='modal-dialog modal-lg'>
			  <template v-slot:title>
			    <h5>Adicionar entidade</h5>
			  </template>

			  <template v-slot:content>
			    <app_entities_form :form='forms.entity' :callback='save'></app_entities_form>
			  </template>
			</app_modal>

			<app_modal id="modal_disable_entity" classes='modal-dialog modal-sm'>
			  <template v-slot:title>
			    <h5><i class="fas fa-exclamation-triangle"></i> Atenção</h5>
			  </template>

			  <template v-slot:content>
			    <p style="">
						<span style="font-size: 0.9em;">
							Deseja mesmo desativar o registro <b><u>{{ forms.disable.object.name }} ({{ forms.disable.object.official_document }})</u></b> do sistema?
							Por questões de segurança essa operação exige uma confirmação por senha e uma justificativa.
						</span>
					</p>

					<form autocomplete="off">
						<app_textarea classes='form-control' label='Justificativa'  v-model='forms.disable.object.reason' :error="forms.disable.errors.reason" title='Qual o motivo de desativar esta entidade?'></app_textarea>
						<app_field type="password" label="Senha" classes="form-control" v-model="forms.disable.object.password" :error="forms.disable.errors.password"></app_field>
					</form>

					<br>

					<button type="button" class="btn btn-danger" @click="disable(forms.disable.object, forms.disable.index)" style='float:right;'> <i class="fas fa-trash-alt"></i> Desativar</button>
			  </template>
			</app_modal>
		</div>
	`,
});

/*
Vue.component('mysearchbtn', {
  template:`
  <div>
    <input type="text" placeholder="type to search"
      v-model="search"
      @input="$emit('update:search', $event.target.value)" />
  </div>`,
  props:['search']
})

new Vue({
  el:'#app',
  data(){
    return{
       original:[],
       list:[],
       search:'',
       resuls:[],
       searchIndex:null
    }
  },
  mounted(){
    axios('https://jsonplaceholder.typicode.com/comments')
       .then(data => {
          this.original = data.data
          this.list = this.original
          this.buildIndex()
      })

    this.$watch('search', () => {
      this.resuls = this.searchIndex.search(this.search)

      this.list = []
      this.resuls.forEach(d => {
        this.original.forEach(p => {
          if(d.ref == p.id) this.list.push(p)
        })

      })
    })
  },
  methods:{
    buildIndex(){
      var documents = this.original
      this.searchIndex = lunr(function () {
        this.ref('id')
        this.field('name')
        this.field('body')
        this.field('email')

        documents.forEach(doc => {
          this.add(doc)
        })
      })
    }
  }
})*/