var contextmenux_actions = {
	methods: {
		use_borders: function(){
			this.controls.table.styles.bordered = true;
			this.controls.contextmenu.contextoptions[6].options[1].options[0].is_checked = true;
			this.controls.contextmenu.contextoptions[6].options[1].options[1].is_checked = false;
		},

		not_use_borders: function(){
			this.controls.table.styles.bordered = false;
			this.controls.contextmenu.contextoptions[6].options[1].options[0].is_checked = false;
			this.controls.contextmenu.contextoptions[6].options[1].options[1].is_checked = true;
		},

		use_striped: function(){
			this.controls.table.styles.striped = true;
		},

		not_use_striped: function(){
			this.controls.table.styles.striped = false;
		},

		set_font_size: function(font_size){
			this.controls.table.styles.font_size = font_size;
		},

		change_column: function(args){
			this.controls.table.columns[args.column].visible = !this.controls.table.columns[args.column].visible;
			this.controls.contextmenu.contextoptions[args.menu_index].options[args.submenu_index].is_checked = !this.controls.contextmenu.contextoptions[args.menu_index].options[args.submenu_index].is_checked;
		}
	}
}

Vue.component('app_search',{
	props:['search'],
	template:`
	<div class="row" style="margin-top: 5px; margin-bottom: 5px;">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-auto">
			<label class="otma-fs-12" style="margin-bottom: 0; margin-left: 5px;" for="coluna">Buscar por:</label>
			<select v-model="search.field" class="form-control">
				<option>Documento</option>
				<option>Nome ou Razão Social</option>
				<option>Apelido ou Nome Fantasia</option>
				<option>Relação</option>
				<option>Atividade</option>
				<option>Status</option>
				<option>Criação</option>
				<option>Última Alteração</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-auto">
			<label class="otma-fs-12" style="margin-bottom: 0;" for="busca"></label>
			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="Digite o que você deseja encontrar" aria-label="Digite o que você deseja encontrar" aria-describedby="basic-addon2" v-model="search.text">
				<div class="input-group-append">
					<button class="btn btn-outline-info" type="button"><i class="fas fa-search"></i></button>
				</div>
			</div>
		</div>
	</div>
	`
});

Vue.component('app_entities_table',{
	mixins: [],
	props: ['forms', 'data', 'classes', 'table', 'controls'],
	data: function(){
		return {
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
		<div style=""><!--border: 1px solid #eee;box-sizing: border-box;">-->
			<div id="entity-container">
				<app_search :search="controls.search"></app_search>
				<table id="entity-table" :class="{'table':true, 'table-sm':true, 'table-hover':true, 'table-striped': controls.table.styles.striped, 'table-bordered': controls.table.styles.bordered}" style='width:100%;' :style="{fontSize: controls.table.styles.font_size + 'px'}">
					<thead>
						<tr>
							<th v-for='column in controls.table.columns' v-if='column.visible' :style="column.style">
								{{ column.title }}
								<span v-if='column.sorted' style=''>
									<i class="fas fa-sort-amount-down"></i>
								</span>
							</th>
						</tr>
					</thead>

					<tbody>
						<tr v-if='data.controls.loaded==false' style='font-size: 12px;text-align:center;'>
							<td colspan='11'>Aguarde.. carregando os registros</td>
						</tr>

						<tr v-if='data.controls.loaded==true && data.objects.length==0' style='font-size: 12px;text-align:center;'>
							<td colspan='11'>Nenhum registro cadastrado</td>
						</tr>

						<template v-if='data.objects.length > 0'>
							<tr v-if='data.controls.loaded' v-for='(entity, index) in data.objects'>
								<td v-if='controls.table.columns.id.visible' style='text-align:center;width:45px;'>{{ entity.id }}</td>
								<td v-if='controls.table.columns.official_document.visible' style='text-align:center;width:140px;'>{{ entity.official_document }}</td>
								<td v-if='controls.table.columns.name.visible'>{{ entity.name }}</td>
								<td v-if='controls.table.columns.popular_name.visible' style='text-align:left;width:90px;'>{{ entity.popular_name }}</td>
								<td v-if='controls.table.columns.company_relations.visible' style='text-align:center;width:160px;'>
									<span v-for="(relation,index) in entity.get_company_relations">
										{{ relation }}
										{{ relation | company_relations_label }}<span v-if='index < (entity.get_company_relations.length-1)' style='padding-right:3px;'>,</span>
									</span>
								</td>
								<td v-if='controls.table.columns.activities.visible' style='text-align:center;width:160px;'>
									<span v-for="(activity,index) in entity.get_activities">
										{{ activity | activity_label }}<span v-if='index < (entity.get_activities.length-1)' style='padding-right:3px;'>,</span>
									</span>
								</td>
								<td v-if='controls.table.columns.status.visible' style='text-align:center;width:60px;'>
									<span v-if="entity.commercial_status=='HAB'"><i class="fas fa-check-circle"></i></span>
									<span v-if="entity.commercial_status=='BLO'"><i class="fas fa-ban"></i></span>
									<span v-if="entity.commercial_status=='SUS'"><i class="fas fa-clock"></i></span>
									<span v-if="entity.commercial_status=='DES'"><i class="fas fa-times"></i></span>
								</td>
								<td v-if='controls.table.columns.creation_date.visible' style='text-align:center;width:135px;'>{{ entity.creation_date | moment }}</td>
								<td v-if='controls.table.columns.last_update.visible' style='text-align:center;width:135px;'>{{ entity.last_update | moment }}</td>
								<td style="padding:5px;">
									<div class="btn-group btn-group-xs" role="group" aria-label="...">
										<button @click="open(entity, index)" type="button" class="btn btn-xs btn-info" title="Editar" data-toggle="modal" data-target="#modal_entity"><i class="fas fa-edit"></i></button>
										<button @click="select(entity, index)" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal_disable_entity" title="Desativar" style='margin-left: 4px;'> <i class="fas fa-trash-alt"></i></button>
									</div>
								</td>
							</tr>
						</template>
					</tbody>
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
			      <app_field label="CNPJ" title="Informe o CNPJ." classes="form-control" v-model="form.object.official_document" :error='form.errors.official_document'  v-else></app_field>
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
	mixins: [base_controller, contextmenux_actions],
	props: ['app_controls'],
	data: function(){
		return {
			data: {
				objects: [],
				selected: {object: null, index: null, backup: null},
				controls: {
					loaded: false,
				}
			},

			controls: {
				table:{
					columns:{
						"id":{"title":"Código", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'red'}},
						"official_document":{"title":"CPF ou CNPJ", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'red'}},
						"name":{"title":"Nome ou razão social", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'red'}},
						"popular_name":{"title":"Nome popular", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'red'}},
						"company_relations":{"title":"Relações", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'blue'}},
						"activities":{"title":"Atividades", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'blue'}},
						"status":{"title":"Atividades", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'blue'}},
						"creation_date":{"title":"Data de criação", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'blue'}},
						"last_update":{"title":"Última alteração", "visible":true, "sorted":false,"sorted_asc": true, 'style':{'text-align':'center','color':'blue'}},
					},
          styles:{
	          bordered: true,
	          striped: true,
	          font_size: 12,
          }
        },
        search: {
          type: '',
					text: '',
					field: 'Documento',
				},

				contextmenu:{
          contextoptions:[
            {"type":"submenu-item", "label":"Entidade selecionada", "options":[
              {"type":"menu-item", "label":"Visualizar ficha", "options":[]},
              {"type":"menu-item", "label":"Contatos", "options":[]},
              {"type":"menu-item", "label":"Endereços", "options":[]},
							{"type":"menu-item", "label":"Crédito", "options":[]},
							{"type":"menu-item", "label":"Visualizar histórico", "options":[]},
							{"type":"menu-item", "label":"Desativar", "options":[]},
						]},
						{"type":"menu-item", "label":"Adicionar entidade", "options":[]},

            {"type":"divider", "label":"", "options":[]},
            {"type":"menu-item", "label":"Colunas", "options":[
              {"type":"menu-item", "label":"Código", "callback":this.change_column, "args":{"column":"id", "menu_index":3, "submenu_index":0}, "is_checked":true, "is_enable":false, "options":[]},
              {"type":"menu-item", "label":"Documento", "callback": this.change_column, "args":{"column":"official_document", "menu_index":3, "submenu_index":1}, "is_checked":false, "is_enable":true, "options":[]},
              {"type":"menu-item", "label":"Nome ou razão", "callback":this.change_column,"args":{"column":"name", "menu_index":3, "submenu_index":2}, "is_checked":false, "is_enable":true, "options":[]},
              {"type":"menu-item", "label":"Nome popular", "callback":this.change_column, "args":{"column":"popular_name", "menu_index":3, "submenu_index":3}, "is_checked":false, "is_enable":true, "options":[]},
              {"type":"menu-item", "label":"Relações", "callback":this.change_column, "args":{"column":"company_relations", "menu_index":3, "submenu_index":4}, "is_checked":false, "is_enable":true, "options":[]},
              {"type":"menu-item", "label":"Atividades", "callback":this.change_column, "args":{"column":"activities", "menu_index":3, "submenu_index":5}, "is_checked":false, "is_enable":true, "options":[]},
              {"type":"menu-item", "label":"Status", "callback":this.change_column, "args":{"column":"status", "menu_index":3, "submenu_index":6}, "is_checked":false, "is_enable":true, "options":[]},
              {"type":"menu-item", "label":"Data de Criação", "callback":this.change_column, "args":{"column":"creation_date", "menu_index":3, "submenu_index":7}, "is_checked":false, "is_enable":true, "options":[]},
              {"type":"menu-item", "label":"Última alteração", "callback":this.change_column, "args":{"column":"last_update", "menu_index":3, "submenu_index":8}, "is_checked":false, "is_enable":true, "options":[]},
            ]},

            {"type":"submenu-item", "label":"Ordenação", "options":[
							{"type":"submenu-item", "label":"Primária", "options":[
								{"type":"menu-item", "label":"Aumentar texto", "options":[]},
								{"type":"menu-item", "label":"Diminuir texto", "options":[]},
							]},

							{"type":"submenu-item", "label":"Adicionais", "options":[
								{"type":"menu-item", "label":"Aumentar texto", "options":[]},
								{"type":"menu-item", "label":"Diminuir texto", "options":[]},
							]},
						]},

            {"type":"menu-item", "label":"Paginação", "options":[]},

            {"type":"submenu-item", "label":"Estilos", "options":[
							{"type":"submenu-item", "label":"Tamanho do texto", "options":[
								{"type":"menu-item", "label":"9 px", "callback":this.set_font_size,"args":9, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"10 px", "callback":this.set_font_size,"args":10, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"11 px", "callback":this.set_font_size,"args":11, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"12 px", "callback":this.set_font_size,"args":12, "is_checked":true, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"13 px", "callback":this.set_font_size,"args":13, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"14 px", "callback":this.set_font_size,"args":14, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"15 px", "callback":this.set_font_size,"args":15, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"16 px", "callback":this.set_font_size,"args":16, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"17 px", "callback":this.set_font_size,"args":17, "is_checked":false, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"18 px", "callback":this.set_font_size,"args":18, "is_checked":false, "is_enable":true, "options":[]},

							]},
							{"type":"submenu-item", "label":"Bordas", "options":[
								{"type":"menu-item", "label":"Com bordas", "callback":this.use_borders, "is_checked":true, "is_enable":true, "options":[]},
								{"type":"menu-item", "label":"Sem bordas", "callback":this.not_use_borders, "is_checked":false, "is_enable":true, "options":[]},
							]},
							{"type":"submenu-item", "label":"Linhas", "options":[
								{"type":"menu-item", "label":"Diferenciadas", "callback":this.use_striped, "options":[]},
								{"type":"menu-item", "label":"Simples", "callback":this.not_use_striped, "options":[]},
							]},
            ]},
          ],
        },


			},

			table_styles: {
				fontSize: 12,
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
							return false;
					}
          if (!validate_name(data_paramters.name)){
             alert("Digite um nome válido.");
             return false;
          }

          if (!validate_data(data_paramters.birthdate_foundation)){
             alert("Data Inválida!!!");
             return false;
          }
        }

        if (data_paramters.type === 'PJ') {
            console.log('OFFICIAL_DOC' + JSON.stringify(data_paramters.official_document));
            //let strCnpj = data_paramters.official_document;
            if (!validate_cnpj(data_paramters.official_document)) {
                alert("Seu CNPJ é inválido!!!");
                return false;
            }

            if (!validate_name(data_paramters.name)){
               alert("Digite um nome valido")
               return false;
            }

        }
        return true;
			};
      this.request('/api/entity/save/', 'post', data_paramters, validation_function, success_function, failure_function);
    },

		disable: function(object, index){
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
    },

		filter_entities: function () {
			let scope = this;
			let base_filter = true;

			let filtered_list = scope.data.objects.filter(function (item) {
				if (scope.controls.search.text != '' && scope.controls.search.text != null) {
					base_filter = scope.apply_busca(item);
				}
				return base_filter;
			});
			return filtered_list;
		},



		apply_busca: function(item){
			//return item[this.controls.search.by.id].search(new RegExp(this.controls.search.value, "i")) != -1;
		},
	},

	mounted: function(){
		this.load();
		this.init_formulary();

		this.controls.contextmenu.contextoptions[3].options[0].is_checked = this.controls.table.columns.id.visible;
		this.controls.contextmenu.contextoptions[3].options[1].is_checked = this.controls.table.columns.official_document.visible;
		this.controls.contextmenu.contextoptions[3].options[2].is_checked = this.controls.table.columns.name.visible;
		this.controls.contextmenu.contextoptions[3].options[3].is_checked = this.controls.table.columns.popular_name.visible;
		this.controls.contextmenu.contextoptions[3].options[4].is_checked = this.controls.table.columns.company_relations.visible;
		this.controls.contextmenu.contextoptions[3].options[5].is_checked = this.controls.table.columns.activities.visible;
		this.controls.contextmenu.contextoptions[3].options[6].is_checked = this.controls.table.columns.status.visible;
		this.controls.contextmenu.contextoptions[3].options[7].is_checked = this.controls.table.columns.creation_date.visible;
		this.controls.contextmenu.contextoptions[3].options[8].is_checked = this.controls.table.columns.last_update.visible;

		this.app_controls.contextmenu.contextoptions.local = this.controls.contextmenu.contextoptions;
	},

	computed: {
		result_list: function() {
			//let result_list = this.filter_entities();
			return []//result_list;
		}
	},
	template: `
		<div>
			<a class="dropdown-item otma-fs-14" href="#" data-toggle="modal" data-target="#modal_entity" @click='init_formulary()'>Adicionar</a>

			<app_entities_table :forms='forms' :data='data' classes='table_entities table-hover' :table="table_styles" :controls="controls" :search="controls.search"></app_entities_table>

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