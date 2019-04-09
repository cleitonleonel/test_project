Vue.component('app-title',{
  props: ['src','title'],
  data: function () {
    return {
    }
  },
  template : `
  	<div>
		<img v-bind:src='src' width="50" height="50">
		<h2><b>{{ title }}</b></h2>
	</div>
   `

})

Vue.component('app_select', {
	props: ['value','options'],
	template:`
		<div>
			<select class='form-control' v-bind:value="value" tabindex='' v-on:input="$emit('input', $event.target.value);">
				<option v-for='item in options' v-if='item.visible && item.filterable' v-bind:value="item">{{ item.label }}</option>
			</select>
		</div>
	`
})

Vue.component('app_check', {
	props: ['id'],
  data: function () {
    return {
    }
  },
  mounted: function(){
  	//$('.icheck').iCheck();
		$(".icheck").iCheck({
			checkboxClass: 'icheckbox_square-green',
			radioClass: 'iradio_square-green',
			increaseArea: '20%' // optional
		});

		 jQuery("#"+this.id).iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%' // optional
    });
    jQuery("#"+this.id).on('ifChecked', function(e){
      //app.$data.checkedHealths.push($(this).val());
    });
    jQuery("#"+this.id).on('ifUnchecked', function(e){
    	//alert("ai")
      //let data = app.$data.checkedHealths;
      //data.splice(data.indexOf($(this).val()),1)
    });


  },
  template: `
  	<input v-bind:id="id" class="icheck flat" name='objects_selected' type="checkbox">
  	`
})

Vue.component('app_rate', {
	props: ['id','rate'],
  data: function () {
    return {
    }
  },
  mounted: function(){
  	$("#rate_"+this.id).rateYo({
			readOnly: true,
			rating    : this.rate,
			spacing   : "1px",
			starWidth: "11px",
			//multiColor: {
			//	"startColor": "#FF0000", //RED
			//	"endColor"  : "#00FF00"  //GREEN
			//}
		});
  },
  updated: function(){
		$("#rate_"+this.id).rateYo({
			readOnly: true,
			rating    : this.rate,
			spacing   : "1px",
			starWidth: "11px",
		});
	},
  template: `
  	<div v-bind:id="'rate_'+id" class="star_rate" v-bind:title="rate" style="margin: auto;height:10px;position:relative;top:0px;"></div>
  	`
})

Vue.component('app_table_options',{
	props: ['controls','exclude'],
	data: {
		selected_objects: {},
	},
	methods:{
		increase_font: function(){
			if (this.controls.table.font.size < 18){
				this.controls.table.font.size = this.controls.table.font.size + 1;
				this.controls.table.font.increase = this.controls.table.font.increase + 1;
			}
		},
		reduce_font: function(){
			if (this.controls.table.font.size > 10){
				this.controls.table.font.size = this.controls.table.font.size - 1;
				this.controls.table.font.increase = this.controls.table.font.increase - 1;
			}
		},

		change_border_visibilty: function(){
			this.controls.table.border.visible = !this.controls.table.border.visible;
		},


	},
	template: `
		<ul class="nav navbar-right panel_toolbox" style='margin-top: -2px;'>
			<li title="Adicionar">
				<a class="collapse-link" data-toggle="modal" data-target="#modal_project">
					<i class="fa fa-user-plus"></i>
				</a>
			</li>

			<li title="Alterar registro">
				<a v-if='controls.selected.counter == 1' class="collapse-link" data-toggle="modal" data-target="#modal_project"><i class="fa fa-pencil"></i></a>
				<a v-else class="collapse-link" disabled="disabled" style="cursor:not-allowed;"><i class="fa fa-pencil"></i></a>
			</li>

			<li title="Configurar Database">
				<a v-if='controls.selected.counter == 1' class="collapse-link" data-toggle="modal" data-target="#modal_database"><i class="fa fa-database"></i></a>
				<a v-else class="collapse-link" disabled="disabled" style="cursor:not-allowed;"><i class="fa fa-database"></i></a>
			</li>

			<li title="Configurar Backup">
				<a v-if='controls.selected.counter == 1' class="collapse-link" data-toggle="modal" data-target="#modal_backup"><i class="fa fa-cloud-upload"></i></a>
				<a v-else class="collapse-link" disabled="disabled" style="cursor:not-allowed;"><i class="fa fa-cloud-upload"></i></a>
			</li>

			<li title='Excluir registro'>
				<a v-on:click="exclude()" ><i class="fa fa-trash"></i></a>
			</li>

			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-cog"></i></a>
				<ul class="dropdown-menu" role="menu">
					<li>
						<a v-on:click="increase_font()" v-bind:class="{disabled: controls.table.font.size >= 18}" style="cursor: pointer;"><i class="fa fa-search-plus"></i> Aumentar fonte</a>
					</li>
					<li><a v-on:click="reduce_font()" v-bind:class="{disabled: controls.table.font.size <= 10}" style="cursor: pointer;"><i class="fa fa-search-minus"></i> Diminuir fonte</a>
					<li>
						<a v-on:click="change_border_visibilty()" style="cursor: pointer;">
							<span v-if="controls.table.border.visible" style="color:#5A738E;"><i class="fa fa-table"></i> Tabela sem borda</span>
							<span v-if="!controls.table.border.visible" style="color:#5A738E;"><i class="fa fa-table"></i> Tabela com borda</span>
						</a>

				</ul>
			</li>
		</ul>
	`
})

Vue.component('app_table_title', {
	props: ['title', 'controls', 'exclude'],
	template:`
	<div class="x_title" style="height:38px;">
		<h2>{{ title }}</h2>
		<app_table_options :controls='controls' :exclude='exclude'></app_table_options>
	</div>
	`
})

Vue.component('app_table_header', {
	props: ['data_list', 'controls','fields'],
	methods:{
		change_primary_order: function(evt,item){
			if(!this.controls.order.extras[item.id]){
				if(this.controls.order.primary.field.id==item.id){
					if (this.controls.order.primary.sort == 'asc'){
						this.controls.order.primary.sort = 'desc'
					}
					else{
						this.controls.order.primary.sort = 'asc'
					}
				}
				else{
					this.controls.order.primary.field = item;
					this.controls.order.primary.sort = 'asc';
				}
			}
			else{
				if (this.controls.order.extras[item.id].sort == 'asc'){
					this.controls.order.extras[item.id].sort = 'desc';
				}
				else{
					this.controls.order.extras[item.id].sort = 'asc'
				}
				this.controls.order.multiple.fields = [];
				this.controls.order.multiple.sorts = [];
			}
		},

		change_extra_order: function(evt,item){
			if(this.controls.order.primary.field.id!=item.id){
				if(this.controls.order.extras[item.id]){
					delete this.controls.order.extras[item.id];
					this.controls.order.multiple.fields = [];
					this.controls.order.multiple.sorts = [];
				}
				else{
					this.controls.order.extras[item.id] = {'field':item,'sort':'asc'};
					this.controls.order.multiple.fields = [];
					this.controls.order.multiple.sorts = [];
				}
			}
		},
	},

	template:`
		<thead>
			<tr class="headings" style="font-size: 10px;">
				<th style="padding: 0px;padding-left: 5px;padding-right: 5px;position: relative;top:-1px;width:20px;">ae
					<input v-if='data_list.length > 0' v-on:click="select_all()" type="checkbox" style="font-size: 10px;">
				</th>

				<th v-for="column in fields" v-if="column.visible==true && column.type!='check'" class="column-title text-center clickable" @contextmenu='change_extra_order($event, column)' v-on:click='change_primary_order($event, column)' v-bind:style='column.style' style='position: relative;'>
					<span class=''>{{ column.label }}</span>
					<span style='padding-left: 2px;' v-if="column.id==controls.order.primary.field.id">
						<i v-if="controls.order.primary.sort=='asc'" class="fa fa-sort-alpha-asc" style='font-size: 12px;' aria-hidden="true"></i>
						<i v-if="controls.order.primary.sort=='desc'" class="fa fa-sort-alpha-desc" style='font-size: 12px;' aria-hidden="true"></i>
					</span>

					<span v-if="typeof(controls.order.extras[column.id]) !== 'undefined'" title='Para remove mantenha a tecla pressionada e click aqui.'>
						CADE? {{ controls.order.extras[column.id] }}
						<span style='padding-left: 2px;' v-if="column.id==controls.order.extras[column.id].field.id">
							<i v-if="controls.order.extras[column.id].sort == 'asc'" class="fa fa-sort-alpha-asc" style='color: #BBB;font-size: 12px;' aria-hidden="true"></i>
							<i v-if="controls.order.extras[column.id].sort == 'desc'" class="fa fa-sort-alpha-desc" style='color: #BBB;font-size: 12px;' aria-hidden="true"></i>
						</span>
					</span>
				</th>
			</tr>
		</thead>
	`
});

Vue.component('app_table_footer', {
	props: ['controls', 'fields', 'filters', 'data_size', 'total_filtered'],
	methods:{
	},
	template:`
		<thead>
			<tr class="headings" style="font-size:10px;padding:0px;">
				<th colspan="100%">
					<span class='pull-left'>
						<span v-if='controls.selected.counter > 1'>{{ controls.selected.counter }} Registros Selecionados</span>
						<span v-if='controls.selected.counter == 1 '>1 Registro Selecionado</span>
					</span>
					<template v-if='data_size > 0'>
						<span  class='pull-right'>
							<span v-if='total_filtered > 0'>Visualizando {{ total_filtered }} de</span>
							{{ data_size }} Registros
						</span>
					</template>
					<span v-if='total_filtered > 0' class='pull-right'>Visualizando {{ total_filtered }} de</span>
					<template v-else class='pull-right'>
						<span class='pull-right'>Nenhum registro cadastrado</span>
					</template>
				</th>
			</tr>
		</thead>
	`
});

Vue.component('app_table_paginate', {
	props: ['controls', 'fields', 'data_size'],
	methods:{
	select_page: function(page){
			this.controls.paginate.current = page-1;
		},

		first_page: function(){
			this.controls.paginate.current = 0;
		},

		before_page: function(){
			if(this.controls.paginate.current > 0){
				this.controls.paginate.current = this.controls.paginate.current-1;
			}
		},
		next_page: function(){
			if(this.controls.paginate.current < this.controls.paginate.total-1){
				this.controls.paginate.current = this.controls.paginate.current + 1;
			}
		},

		last_page: function(){
			this.controls.paginate.current = this.controls.paginate.total - 1;
		},
	},

	template:`
		<div id='paginate' v-if='controls.paginate.activated' class='pull-right' style="display: flex;">
			<!--<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == 0 || controls.paginate.total==1" title='Primeira Página' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="first_page()">
				<i class="fa fa-step-backward" style="font-size: 8px;position: relative; top: -3px;left:-2px;"></i>
			</a>

			<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == 0 || controls.paginate.total==1"title='Página anterior' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="before_page()">
				<i class="fa fa-caret-left" style="font-size: 12px;position: relative; top: -1px;left:-2px;"></i>
			</a>

			<a class='btn btn-default' v-if='data_size == 0' disabled style="position:relative;margin-right:3px;text-align: center;width: 20px;">
				<span style="font-size: 9px;position: relative; top: -2px;left:-4px;">1</span>
			</a>

			<div v-if='data_size > 0' v-for="page in controls.paginate.total">
				<a class='btn btn-default' v-bind:class="{active:page-1==controls.paginate.current}" v-bind:title="'Página '+page" style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="select_page(page)">
					<span style="font-size: 9px;position: relative; top: -2px;left:-4px;">{{ page }}</span>
				</a>
			</div>

			<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == controls.paginate.total-1 || controls.paginate.total==1" title='Página seguinte' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="next_page()">
				<i class="fa fa-caret-right" style="font-size: 12px;position: relative; top: -1px;left:-2px;"></i>
			</a>

			<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == 0 || controls.paginate.current == controls.paginate.total-1 || controls.paginate.total==1" title='Ultima Página' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="last_page()">
				<i class="fa fa-step-forward" style="font-size: 8px;position: relative; top: -3px;left:-2px;"></i>
			</a>-->


			<!-- TESTANDO MODELO DE PAGINACAO DAQUI PRA BAIXO -->
			<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == 0 || controls.paginate.total==1" title='Primeira Página' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="first_page()">
				<i class="fa fa-step-backward" style="font-size: 8px;position: relative; top: -3px;left:-2px;"></i>
			</a>

			<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == 0 || controls.paginate.total==1"title='Página anterior' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="before_page()">
				<i class="fa fa-caret-left" style="font-size: 12px;position: relative; top: -1px;left:-2px;"></i>
			</a>

			<a class='btn btn-default' v-if='data_size == 0' disabled style="position:relative;margin-right:3px;text-align: center;width: 20px;">
				<span style="font-size: 9px;position: relative; top: -2px;left:-4px;">1</span>
			</a>

			<div v-if='data_size > 0' v-for="page in controls.paginate.total">
				<a class='btn btn-default' v-bind:class="{active:page-1==controls.paginate.current}" v-bind:title="'Página '+page" style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="select_page(page)">
					<span style="font-size: 9px;position: relative; top: -2px;left:-4px;">{{ page }}</span>
				</a>
			</div>

			<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == controls.paginate.total-1 || controls.paginate.total==1" title='Página seguinte' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="next_page()">
				<i class="fa fa-caret-right" style="font-size: 12px;position: relative; top: -1px;left:-2px;"></i>
			</a>

			<a class='btn btn-default' :disabled="data_size == 0 || controls.paginate.current == controls.paginate.total-1 || controls.paginate.total==1" title='Ultima Página' style="position:relative;margin-right:3px;text-align: center;width: 20px;" v-on:click="last_page()">
				<i class="fa fa-step-forward" style="font-size: 8px;position: relative; top: -3px;left:-2px;"></i>
			</a>
		</div>
	`
})

Vue.component('app_table_search', {
	props: ['controls', 'fields', 'data_size'],
	template:`
		<div class='row' style='margin-top: 6px;'>
			<div class='col-lg-2 col-md-2 col-sm-2 col-xs-12'>
				<select class='form-control' v-model='controls.search.by'>
					<option v-for='option in fields' :value='option'>{{ option.label }}</option>
				</select>
			</div>

			<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
				<input class='form-control' v-model='controls.search.value' type='text' placeholder='Pesquise aqui..'>
			</div>

			<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
				<app_table_paginate :controls='controls' :fields='fields' :data_size='data_size'></app_table_paginate>
			</div>
		</div>
	`
})

Vue.component('app_confirm_modal', {
	props:['id','title','text'],
	data: function () {
	},
	template: `
	<div class="modal fade" v-bind:id="id" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" style='padding-top: 10px;padding-bottom: 8px;'>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">{{ title }}</h4>
				</div>
				<div class="modal-body">
					{{ text }}
				</div>
				<div class="modal-footer" style='padding-top: 10px;padding-bottom: 5px;padding-right:5px;border: 0px solid #fff;'>
					<!--<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Close</button>-->
					<button type="button" class="btn btn-sm btn-default" style='width: 80px;'>Ok</button>
				</div>
			</div>
		</div>
	</div>
	`
});

Vue.component('app_form_modal', {
	props:['id','title', 'filters', 'fields'],
	data: function () {
		return {
			comparation_types: {
			'text':[
				{'id':'equals', 'label':'Inicia com'},
				{'id':'contains', 'label':'Contém'},
				{'id':'not_contains', 'label':'Não contém'},
			],

			'logico':[
				{'id':'equals', 'label':'Igual'},
			],

			'datetime':[
				{'id':'equals', 'label':'Inicia com'},
				{'id':'contains', 'label':'Contém'},
				{'id':'not_contains', 'label':'Não contém'},
				{'id':'greater_and_equals', 'label':'A partir do dia'},
				{'id':'greater', 'label':'Depois do dia'},
				{'id':'lower_and_equals', 'label':'Até dia'},
				{'id':'lower', 'label':'Antes do dia'},
			],

			},
			filter:{'field':{'type':'text'},'comparation':{}, 'value':''},
		}
	},
	methods:{
		save: function(){
			//if(this.object == null){
			this.filters.push(this.filter);
			//}
			//else{
			//	this.object = this.filter;
			//}
			this.filter = {'field':{'type':'text'},'comparation':{}, 'value':''};
			//this.object = null;
		},
	},
	template: `
	<div class="modal fade" v-bind:id="id" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" style='padding-top: 10px;padding-bottom: 8px;'>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">{{ title }}</h4>
				</div>
				<div class="modal-body" style='padding-left: 25px;padding-right: 25px;'>
					<div class='row'>
						<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
							<label><sub>Campo:</sub></label>
							<select class='form-control' v-model='filter.field'>
								<option v-for='option in fields' v-bind:value="option">{{ option.label }}</option>
							</select>
						</div>

						<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
							<label><sub>Filtro:</sub></label>
							<select class='form-control' v-model='filter.comparation'>
								<option v-for='option in comparation_types.text' v-if="filter.field.type=='text'"  v-bind:value="option">{{ option.label }}</option>

								<option v-for='option in comparation_types.logico' v-if="filter.field.type=='logico'" v-bind:value="option">{{ option.label }}</option>

								<option v-for='option in comparation_types.datetime' v-if="filter.field.type=='datetime'" v-bind:value="option">{{ option.label }}</option>
							</select>
						</div>
					</div>

					<div class='row'>
						<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
						<label><sub>Valor:</sub></label>
						<input v-if="filter.field.type=='text'" class='form-control' v-model='filter.value' type='text'>

						<span v-if="filter.field.type=='logico'">
							<select class='form-control' v-model='filter.value' type='text'>
								<option value="true" selected=true>Sim</option>
								<option value="false">Não</option>
							</select>
						</span>

						<input v-if="filter.field.type=='datetime'" class='form-control' v-model='filter.value' type='date'>
						</div>
					</div>
				</div>
				<div class="modal-footer" style='padding-top: 10px;padding-bottom: 20px;padding-right:20px;border: 0px solid #fff;'>
					<button type="button" class="btn btn-sm btn-default" style='width: 120px;' v-on:click='save()'>Salvar</button><!-- data-dismiss="modal"  -->
				</div>
			</div>
		</div>
	</div>
	`
});

Vue.component('app_context_menu_table_order', {
	props:['controls', 'context', 'execute', 'change_sort', 'remove'],
	data: function () {
		return {}
	},
	methods:{
		get_lenght: function(object){
			if(object!=null){
				return Object.keys(object).length;
			}
			return null;
		}
	},
	template: `
		<v-contextmenu-submenu title="Ordenação" class='vcontext_icon icon_ordernation'>
			<template v-if='get_lenght(context.local)!= 0'>
				<v-contextmenu-item @click="execute(context.local.action, context.local.object)" title='Adicionar novo índice de ordenação.'>
					{{ context.local.label }}
				</v-contextmenu-item>
				<v-contextmenu-item divider ></v-contextmenu-item>
			</template>

			<v-contextmenu-submenu :title="controls.order.primary.field.label">
				<v-contextmenu-item @click="controls.order.primary.sort='asc'" style='padding-right: 7px;width:180px;'>Ordem crescente
					<div v-if="controls.order.primary.sort == 'asc'" style='float:right;margin-top:-1px;padding-left: 10px;'>
						<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
					</div>
				</v-contextmenu-item>

				<v-contextmenu-item @click="controls.order.primary.sort='desc'" style='padding-right: 7px;width:180px;'>Ordem decrescente
					<div v-if="controls.order.primary.sort == 'desc'" style='float:right;margin-top:-1px;padding-left: 10px;'>
						<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
					</div>
				</v-contextmenu-item>
				<v-contextmenu-item divider></v-contextmenu-item>
				<v-contextmenu-item disabled title='Para trocar o ordenador principal da tabela basta clicar em outra coluna com o botão esquerdo do mouse. Não é possivel removê-lo.'>Remover ordenação</v-contextmenu-item>
			</v-contextmenu-submenu>

			<template v-if='get_lenght(controls.order.extras)!= 0'>
				<v-contextmenu-submenu v-for='item in controls.order.extras' :title="item.field.label">
					<v-contextmenu-item @click="change_sort(item,'asc')" style='padding-right: 7px;width:180px;'>Ordem crescente
						<div v-if="controls.order.extras[item.field.id].sort == 'asc'" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>

					<v-contextmenu-item @click="change_sort(item, 'desc')" style='padding-right: 7px;width:180px;'>Ordem decrescente
						<div v-if="controls.order.extras[item.field.id].sort == 'desc'" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>
					<v-contextmenu-item divider></v-contextmenu-item>
					<v-contextmenu-item @click="remove(controls.order.extras[item.field.id])">Remover ordenação</v-contextmenu-item>
				</v-contextmenu-submenu>
			</template>
		</v-contextmenu-submenu>
	`
});

Vue.component('app_context_menu_table_filters', {
	props:['filters', 'context', 'remove', 'remove_all'],
	data: function () {
		return {}
	},
	methods:{
		get_lenght: function(object){
			if(object!=null){
				return Object.keys(object).length;
			}
			return null;
		}
	},
	template: `
		<v-contextmenu-submenu title="Filtros" class='vcontext_icon icon_filters'>
			<v-contextmenu-item title='Adicionar novo filtro.' data-toggle="modal" data-target="#modal_filter">
				Adicionar filtro
			</v-contextmenu-item>
			<v-contextmenu-item v-if='filters.length>0' title='Remover todos os filtros' @click="remove_all()">Remover filtros</v-contextmenu-item>
			<v-contextmenu-item v-else title='Remover todos os filtros' disabled>Remover filtros</v-contextmenu-item>

			<template v-if='filters.length>0'>
				<v-contextmenu-item divider ></v-contextmenu-item>
				<v-contextmenu-submenu v-for='item in filters' :title="item.field.label">
					<v-contextmenu-item @click="" style='padding-right: 7px;width:180px;' data-toggle="modal" data-target="#modal_filter">Editar</v-contextmenu-item>
					<v-contextmenu-item @click="remove(item)" style='padding-right: 7px;width:180px;'>Remover</v-contextmenu-item>
				</v-contextmenu-submenu>
			</template>
		</v-contextmenu-submenu>
	`
});

Vue.component('app_table', {
	mixins: [base_controller],
	props: ['title'],
	data: function () {
		return {
			data_list:[],
			data_size: 0,
			object: {},

			form:{
				errors: null
			},
			context:{
				local:{},
				global:{}
			},

			data:{
				total_filtered:0,
			},

			controls:{
				table:{
					font:{
						size:10,
						increase: 0,
					},
					border: {
						visible:true,
						color: "#999"
					},
					rows: {
						limit: 12,
						height: 30,
						extra: 10,
					}
				},

				selected:{
					registers: {},
					counter: 0,
					all:false,
					filter:null,
				},

				search: {
					by: null,
					value: null,
				},

				order: {
					primary:{},
					extras:{},
					multiple:{
						fields:[],
						sorts:[],
					}
				},

				paginate:{
					activated: true,
					auto: true,
					current: 1,
					limit: null,
					total: 2
				}
			},

			selected_object:null,
			selected_list: null,
			visible_search: false,
			//selected_counter: 0,
			change_table_design:true,
			table_bordered:true,
			increase_font:0,
			font_size: 10,
			//selected_counter: 1,
			objects_counter: 0,

			fields: [
				{'id': 'selected', 'label':'', 'visible':true, 'filterable':false, 'type':'check', 'class':'', 'style':'padding: 0px;padding-left: 3px;padding-right: 5px;width:20px;padding-top: 4px;'},
				{'id': 'project_name', 'label':'Nome do Projeto', 'visible':true, 'filterable':true, 'type':'text', 'class':'', 'style':''},
				{'id': 'project_key', 'label':'Autorização', 'visible':true, 'filterable':true, 'type':'text', 'class':'text-center', 'style':''},
				{'id': 'project_description', 'label':'Descrição', 'visible':false, 'filterable':true, 'type':'text', 'class':'', 'style':''},

				{'id': 'project_language', 'label':'Linguagem', 'visible':true, 'filterable':true, 'type':'text', 'class':'text-center', 'style':''},
				{'id': 'project_time_zone', 'label':'Fuso horário', 'visible':true, 'filterable':true, 'type':'text', 'class':'text-center', 'style':''},
				{'id': 'repository_page', 'label':'Controle de versão', 'visible':true, 'filterable':true, 'type':'text', 'class':'', 'style':''},
				{'id': 'jenkins_page', 'label':'Integração contínua', 'visible':true, 'filterable':true, 'type':'text', 'class':'', 'style':''},
				{'id': 'sonar_page', 'label':'Qualidade', 'visible':true, 'filterable':true, 'type':'text', 'class':'', 'style':''},
				{'id': 'creation_date', 'label':'Criado em', 'visible':true, 'filterable':true, 'type':'datetime', 'class':'text-center', 'style':''},
				{'id': 'last_update', 'label':'Última alteração', 'visible':true, 'filterable':true, 'type':'datetime', 'class':'text-center', 'style':''},
				{'id': 'is_active', 'label':'Concluído', 'visible':true, 'filterable':true, 'type':'logico', 'class':'', 'style':''},

					/*project_key;
					project_name;project_description
					project_language;project_time_zone;use_time_zone;repository_page;jenkins_page;sonar_page;
					database_options;database_engine;database_name;database_user;database_pass;database_host;
					database_port;backup_options;backup_remote_plan;backup_remote_email;backup_remote_token;
					backup_remote_size;backup_remote_size_max;backup_remote_size_used;is_finished*/
			],

			filters: [
				//{"id": "3","field":"project_description", "value":"programa"},
			],
			new_filter: {"field":null, "value":null},
		}
	},
	methods: {
		load_all: function(){
			var scope = this;
			var data_paramters = {};
			var success_function = function(response){
				scope.data_list = response.object;
				scope.data_size = response.object.length;
				scope.form.errors = response.message;
				scope.controls.paginate.total = 2;//Math.round(scope.data_size/scope.limit_rows);
			}

			var failure_function = function(response){
				scope.form.errors = response.message;
			}
			this.request('/api/project/','get',data_paramters, null, success_function, failure_function);
		},
		select: function(object){
			if(object.selected){
				object.selected = false;
				delete this.controls.selected.registers[object.id]
				this.controls.selected.counter = this.controls.selected.counter - 1;
			}
			else{
				object.selected = true;
				this.controls.selected.counter = this.controls.selected.counter + 1;
				this.controls.selected.registers[object.id] = object;
				this.object = object;
			}
		},
		select_all: function(){
			if (this.controls.selected.all == false){
				this.data_list.reduce((obj, item) => {
					//obj[item.id] = item;
					this.controls.selected.registers[item.id] = item;
					item.selected = true;
				return item
				}, {});
				this.controls.selected.all = true;
			}
			else{
				this.selected_objects = this.data_list.reduce((obj, item) => {
					item.selected = false;
					delete this.controls.selected.registers[item.id];
				return item
				}, {});
				this.controls.selected.all = false;
			}
		},
		resize_table: function() {
      this.screen_width  = window.innerWidth;   //window.screen.availWidth;
			this.screen_height = window.innerHeight; //window.screen.availHeight;
			this.controls.table.rows.height = 30;
			this.controls.table.rows.limit  = Math.floor((this.screen_height-350)/this.controls.table.rows.height);
			if(this.controls.table.rows.limit < 3){
				this.controls.table.rows.limit = 3;
			}
    },

    highlight: function(words, search, column){
    	var result = words;
			if(search.value != null && search.value != ''){
				if(column.type=='text'){
					if(search.by.id == column.id){
						var pattern = new RegExp(search.value, 'gi');
						result = words.replace(pattern, "<span class='highlight' style='background: #669999;color: white;'>" + search.value + "</span>").toUpperCase();
					}
					return result.toUpperCase();
				}

				if(column.type=='datetime'){
					var filtered_text = this.$options.filters.datetime_format(words);//base_controller.$options.filter("datetime_format", result);
					if(search.by.id == column.id){
						if(filtered_text.indexOf(search.value)!=-1){
							result = filtered_text.replace(search.value, "<span class='highlight' style='background: #669999;color: white;'>" + search.value + "</span>").toUpperCase();
						}
						return result;
					}
					else{
						return filtered_text;
					}
				}
			}
			else{
				if(column.type=='text'){
					return result.toUpperCase();
				}
				if(column.type=='datetime'){
					return this.$options.filters.datetime_format(result);
				}
			}
		},

    remove_filter: function(filter){
    	this.filters.pop(filter);
    },
    remove_all_filters: function(){
    	this.filters = [];
    },

    change_primary_order: function(evt,item){
			if(!this.controls.order.extras[item.id]){
				if(this.controls.order.primary.field.id==item.id){
					if (this.controls.order.primary.sort == 'asc'){
						this.controls.order.primary.sort = 'desc'
					}
					else{
						this.controls.order.primary.sort = 'asc'
					}
				}
				else{
					this.controls.order.primary.field = item;
					this.controls.order.primary.sort = 'asc';
				}
			}
			else{
				if(this.controls.order.extras[item.id].sort == 'asc'){
					this.controls.order.extras[item.id].sort = 'desc';
				}
				else{
					this.controls.order.extras[item.id].sort = 'asc'
				}
				this.controls.order.multiple.fields = [];
				this.controls.order.multiple.sorts = [];
			}
		},

		set_extra_order: function(column, sort){
			column.sort = sort;
			Vue.set(this.controls.order.extras, column.field.id, column)
			this.$forceUpdate();
		},

		remove_extra_order: function(column){
			delete this.controls.order.extras[column.field.id];
			this.$forceUpdate();
		},

		set_type_extra_order: function(item, type){
			console.log("CHEGUEI: "+JSON.stringify(item));
			this.controls.order.extras = {};//[item.field.id].sort = type;
		},

		change_extra_order: function(item){
			if(this.controls.order.primary.field.id!=item.id){
				if(this.controls.order.extras[item.id]){
					delete this.controls.order.extras[item.id];
					this.controls.order.multiple.fields = [];
					this.controls.order.multiple.sorts = [];
				}
				else{
					this.controls.order.extras[item.id] = {'field':item,'sort':'asc'};
					this.controls.order.multiple.fields = [];
					this.controls.order.multiple.sorts = [];
				}
			}
			else{
				//alert("Erro! Campo já é utilizado para ordenação primaria.. entao nao fazer nada..")
			}
		},

		verify_context_ordernation: function(column){
			if(this.controls.order.extras[column.id]){
				this.append_context({'label':'Remover '+column.label,'object':column,'action':'change_extra_order'})
			}
			else{
				this.append_context({'label':'Adicionar '+column.label,'object':column,'action':'change_extra_order'})
			}
		},

		remove_context: function(){
			this.context.local = {}
		},

		handleClick: function(vm, event) {
			console.log(vm, event)
			this.remove_context();
		},
		handleSubmenuShow: function(vm, placement) {
			console.log(vm, placement)
			this.remove_context();
		},

		execute: function(action, object){
			this[action](object);
		},

		append_context: function(context){
			this.context.local = context; //['teste'] = context;
		},

		/* funções que processam o datalist */
		apply_filters: function(item){
			var result_filter = true;
			this.filters.forEach(function(filter, index){
				var filtered = false;
				if(filter.field.type=='text'){
					if(filter.comparation.id == 'equals'){
						filtered = item[filter.field.id].search(new RegExp(filter.value, "i")) == 0;
					}
					else if(filter.comparation.id == 'contains'){
						filtered = item[filter.field.id].search(new RegExp(filter.value, "i")) != -1;
					}

					else if(filter.comparation.id == 'not_contains'){
						filtered = item[filter.field.id].search(new RegExp(filter.value, "i")) == -1;
					}
				}
				else if(filter.field.type=='datetime'){
					//if(filtered_text.indexOf(search.value)!=-1){
				}
				else{
					filtered = true;
				}
				result_filter = filtered && result_filter;
				if(result_filter == false){
					return false;
				}
			});
			return result_filter;
		},
		apply_search: function(item){
			if(this.controls.search.by.type=='text'){
				return item[this.controls.search.by.id].search(new RegExp(this.controls.search.value, "i")) != -1;
			}
			else if(scope.controls.search.by.type=='datetime'){
				var filtered_text = this.$options.filters.datetime_format(item[this.controls.search.by.id]);
				return filtered_text.indexOf(this.controls.search.value)!=-1;
			}
			else{
				return true
			}
		},
		apply_orders: function(list){
			this.controls.order.multiple.fields = [];
			this.controls.order.multiple.sorts = [];
			if (Object.keys(this.controls.order.extras).length>0){
				this.controls.order.multiple.fields.push(this.controls.order.primary.field.id);
				this.controls.order.multiple.sorts.push(this.controls.order.primary.sort);
				for (var key in this.controls.order.extras){
					this.controls.order.multiple.fields.push(key);
					this.controls.order.multiple.sorts.push(this.controls.order.extras[key].sort);
				}
			}
			else{
				this.controls.order.multiple.fields.push(this.controls.order.primary.field.id);
				this.controls.order.multiple.sorts.push(this.controls.order.primary.sort);
			}
			return _.orderBy(list, this.controls.order.multiple.fields, this.controls.order.multiple.sorts);
		},
		apply_pagination: function(list){
			var scope = this;
			var paginated_result = null;
			if(scope.controls.paginate.activated){
				if(scope.controls.paginate.auto){
					if(list.length < scope.controls.table.rows.limit){
						scope.controls.table.rows.extra = scope.controls.table.rows.limit - list.length;
					}
					else{
						//alert("TEM MAIS DE UMA PAGINA ---> CABEM: "+scope.controls.table.rows.limit+" - E TEMOS "+list.length+" REGISTROS");
						//alert("O USUARIO DEIXOU NO AUTOMATICO");// "+scope.controls.paginate.limit+" ITENS POR VEZ..");

						scope.controls.paginate.total = Math.ceil(list.length/scope.controls.table.rows.limit);
						paginated_result = list.slice(scope.controls.paginate.current*scope.controls.table.rows.limit, scope.controls.paginate.current*scope.controls.table.rows.limit+scope.controls.table.rows.limit);
						scope.controls.table.rows.extra = scope.controls.table.rows.limit - paginated_result.length
						return _.orderBy(paginated_result, scope.controls.order.primary.field.id, scope.controls.order.primary.sort);
					}
				}
				else{
					if(list.length < scope.controls.table.rows.limit){
						scope.controls.table.rows.extra = scope.controls.table.rows.limit - list.length;
					}
					else{
						//alert("Cara tem mais registros que o que cabe.. iniciar paginação")
						scope.controls.paginate.total = Math.ceil(list.length/scope.controls.paginate.limit);
						//alert('CARA VAI TER:'+scope.controls.paginate.total+" PAGINAS DE "+scope.controls.paginate.limit+" ITENS")
						//alert("PAGINA ATUAL: "+scope.controls.paginate.current)
						var init_slice = scope.controls.paginate.current*scope.controls.paginate.limit;
						//alert("COMECAR DO ITEM: "+init_slice);
						var end_slice = scope.controls.paginate.current*scope.controls.paginate.limit+scope.controls.paginate.limit;
						//alert("TERMINAR NO ITEM: "+end_slice);
						paginated_result = list.slice(init_slice, end_slice);
						scope.controls.table.rows.extra = scope.controls.paginate.limit - paginated_result.length;
						return _.orderBy(paginated_result, scope.controls.order.primary.field.id, scope.controls.order.primary.sort);
					}
					//scope.controls.table.rows.extra = scope.controls.paginate.limit - list.length;
				}
			}
			//else{
			//	//console.log('NAO TEM PAGINACAO.. COLOCAR TUDO'+JSON.stringify(list))
			//}
			return list

			/*
			if(list.length < scope.controls.table.rows.limit){
				scope.controls.paginate.total = 1;
				if(scope.controls.paginate.activated){
					if(scope.controls.paginate.auto){
						alert('eh no auto')
						scope.controls.table.rows.extra = scope.controls.table.rows.limit - list.length;
						alert('foi')
					}
					else{
						console.log('eh no manual veja a list:'+JSON.stringify(list))
						scope.controls.table.rows.extra = scope.controls.paginate.limit - list.length;
						alert('foi')
					}
				}
				else{
					scope.controls.table.rows.extra = 0;
				}
				return list;
			}
			else{
				alert("TEM MAIS DE UMA PAGINA ---> MAX ROWS: "+scope.controls.table.rows.limit+" - "+list.length)
				scope.controls.paginate.total = Math.ceil(scope.data_size/scope.controls.table.rows.limit);
				var paginated_result = list.slice(scope.controls.paginate.current*scope.controls.table.rows.limit, scope.controls.paginate.current*scope.controls.table.rows.limit+scope.controls.table.rows.limit);
				scope.controls.table.rows.extra = scope.controls.table.rows.limit - paginated_result.length
				//alert("VEJA ORDENADO DOIS: "+_.orderBy(paginated_result, 'name'));
				return _.orderBy(paginated_result, scope.controls.order.primary.field.id, scope.controls.order.primary.sort);
			}
			*/
		},
		change_pagination: function(value){
			this.controls.paginate.auto = false;
			this.controls.paginate.limit = value;
			this.$forceUpdate();
		},

		exclude: function(){
			var scope = this;
			var first_element = scope.controls.selected.registers[Object.keys(scope.controls.selected.registers)[0]];
			var data_paramters = {
				'id':first_element.id,
			}

			var success_function = function(response){
				//first_element.selected = false;
				//delete scope.selected_objects[first_element.id];
				//this.selected_counter = this.selected_counter - 1;
				scope.unselect_register(first_element);
				//scope.controls.selected.registers.pop(first_element);
				scope.data_list.splice(index, 1);



				success_notify(null,"Operação realizada com sucesso! Objeto apagado");

				scope.objects_counter = scope.objects_counter - 1;
				scope.errors = response.message;
			}

			var failure_function = function(response){
				error_notify(null,"Falha na operação.");
				scope.errors = response.message;
			}

			scope.request('/api/project/delete','post',data_paramters, null,success_function, failure_function);

		},

		filter_list: function(){
			var scope = this;
			var base_filter = true;
			var extra_filter = false;

			var filtered_list = scope.data_list.filter(function(item){
				if(scope.controls.search.value != "" && scope.controls.search.value != null){
					base_filter = scope.apply_search(item);
				}

				if(scope.filters.length>0){
					extra_filter = scope.apply_filters(item);
				}
				else{
					extra_filter = true;
				}
				return base_filter && extra_filter;
			});
			return filtered_list;
		},
	},

	beforeCreate(){
		window.addEventListener('resize',this.resize_table);
	},

	created(){
		this.resize_table();
		this.controls.search.by = this.fields[1];
		this.controls.paginate.current = 0;
		this.controls.order.primary = {'field':this.fields[1],'sort':'asc'};
		//this.filters.push({"field":{"id":"project_name","label":"Nome do Projeto","visible":true,"filterable":true,"type":"text","class":"","style": "" },"comparation":{"id":"equals","label":"Inicia com"},"value":"pr"})
		//this.controls.order.extras[this.fields[1].id] = {'field':this.fields[1],'sort':'asc'};
	},

	mounted: function(){
		this.load('/api/project/');
	},

	computed: {
		result_list: function() {
			var result_list = this.filter_list();
			result_list = this.apply_orders(result_list);
			this.data.total_filtered =  result_list.length;
			result_list = this.apply_pagination(result_list);
			return result_list;
		}
	},

	destroyed: function() {
		window.removeEventListener('resize', this.resize_table);
	},

	template:`
	<div class="col-md-12 col-sm-12 col-xs-12" v-contextmenu:contextmenu @click="remove_context()">
		<v-contextmenu ref="contextmenu">
			<v-contextmenu-item class='vcontext_icon icon_insert' style='padding-right: 7px;width:180px;' data-toggle='modal' data-target='#modal_project'>Adicionar</v-contextmenu-item>
			<v-contextmenu-item class='vcontext_icon icon_edit' style='padding-right: 7px;width:180px;' data-toggle='modal' data-target='#modal_project'>Editar</v-contextmenu-item>
			<v-contextmenu-item class='vcontext_icon icon_remove' style='padding-right: 7px;width:180px;' data-toggle='modal' data-target='#modal_project'>Excluir</v-contextmenu-item>
			<v-contextmenu-item divider></v-contextmenu-item>

			<app_context_menu_table_filters :filters='filters' :context='context' :remove='remove_filter' :remove_all='remove_all_filters'></app_context_menu_table_filters>
			<app_context_menu_table_order :controls='controls' :context='context' :execute='execute' :change_sort='set_extra_order' :remove='remove_extra_order'></app_context_menu_table_order>



			<v-contextmenu-submenu title="Paginação" class='vcontext_icon icon_pagination'>
				<v-contextmenu-item v-if="controls.paginate.activated" @click="controls.paginate.activated = false;controls.paginate.limit = 10;" style='padding-right: 7px;'>Desativar paginação</v-contextmenu-item>
				<v-contextmenu-item v-else @click="controls.paginate.activated = true;controls.paginate.auto = true;" style='padding-right: 7px;'>Ativar paginação</v-contextmenu-item>
				<v-contextmenu-item divider></v-contextmenu-item>

				<template v-if='controls.paginate.activated'>
					<v-contextmenu-item @click="controls.paginate.auto = true;" style='padding-right: 7px;width:180px;'>Automático
						<div v-if="controls.paginate.auto" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>

					<v-contextmenu-item @click="change_pagination(10)" style='padding-right: 7px;width:180px;'>10 Registros
						<div v-if="controls.paginate.auto==false && controls.paginate.limit == 10" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>

					<v-contextmenu-item @click="change_pagination(25)" style='padding-right: 7px;width:180px;'>25 Registros
						<div v-if="controls.paginate.auto==false && controls.paginate.limit == 25" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>

					<v-contextmenu-item @click="change_pagination(50)" style='padding-right: 7px;width:180px;'>50 Registros
						<div v-if="controls.paginate.auto==false && controls.paginate.limit == 50" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>

					<v-contextmenu-item @click="change_pagination(100)" style='padding-right: 7px;width:180px;'>100 Registros
						<div v-if="controls.paginate.auto==false && controls.paginate.limit == 100" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>

					<v-contextmenu-item @click="change_pagination(200)" style='padding-right: 7px;width:180px;'>200 Registros
						<div v-if="controls.paginate.auto==false && controls.paginate.limit == 200" style='float:right;margin-top:-1px;padding-left: 10px;'>
							<i class="fa fa-check" style='font-size: 12px;' aria-hidden="true"></i>
						</div>
					</v-contextmenu-item>
				</template>

				<template v-else>
					<v-contextmenu-item disabled>Automático</v-contextmenu-item>
					<v-contextmenu-item disabled>10 Registros</v-contextmenu-item>
					<v-contextmenu-item disabled>25 Registros</v-contextmenu-item>
					<v-contextmenu-item disabled>50 Registros</v-contextmenu-item>
					<v-contextmenu-item disabled>100 Registros</v-contextmenu-item>
					<v-contextmenu-item disabled>200 Registros</v-contextmenu-item>
				</template>


			</v-contextmenu-submenu>

      <v-contextmenu-item divider></v-contextmenu-item>

      <v-contextmenu-submenu @submenu-show="handleSubmenuShow" title="Configurações" class='vcontext_icon icon_config'>
        <v-contextmenu-item @click="handleClick">Tabela</v-contextmenu-item>
        <v-contextmenu-item @click="handleClick">Icones</v-contextmenu-item>
        <v-contextmenu-item divider></v-contextmenu-item>
        <v-contextmenu-submenu title="Tabela">
          <v-contextmenu-item @click="handleClick">Fonte</v-contextmenu-item>
          <v-contextmenu-item @click="handleClick">Bordas</v-contextmenu-item>
        </v-contextmenu-submenu>
        <v-contextmenu-item @click="handleClick">Menu 4</v-contextmenu-item>
      </v-contextmenu-submenu>
    </v-contextmenu>

		<div class="x_panel" style='padding-bottom: 0px;'>
			<app_table_title :title='title' :controls='controls' :exclude='exclude'></app_table_title>
			<div class="clearfix"></div>

			<div class="x_content" style='padding-left:0px;padding-right:0px;padding-bottom:10px;'>
				<div class='row' style='padding-bottom: 0px;'>
					<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
						<div class="table-responsive">
 							<table class="table table-striped table-sm jambo_table" style='white-space: nowrap;' v-bind:class="{'table-bordered': controls.table.border.visible}">
								<thead>
									<tr class="headings" style="font-size: 10px;">
										<th style="padding: 0px;padding-left: 5px;padding-right: 5px;position: relative;top:-1px;width:20px;">
											<input v-if='data_list.length > 0' v-on:click="select_all()" type="checkbox" style="font-size: 10px;">
											<input v-else disabled v-on:click="select_all()" type="checkbox" style="font-size: 10px;">
										</th>

										<th v-for="column in fields" v-if="column.visible==true && column.type!='check'" class="column-title text-center clickable" v-on:click='change_primary_order($event, column)' @contextmenu="verify_context_ordernation(column)" v-bind:style='column.style' style='position: relative;'>
											<span class=''>{{ column.label }}</span>
											<span style='padding-left: 2px;' v-if="column.id==controls.order.primary.field.id">
												<i v-if="controls.order.primary.sort=='asc'" class="fa fa-sort-alpha-asc" style='font-size: 12px;' aria-hidden="true"></i>
												<i v-if="controls.order.primary.sort=='desc'" class="fa fa-sort-alpha-desc" style='font-size: 12px;' aria-hidden="true"></i>
											</span>

											<span v-if="typeof(controls.order.extras[column.id]) !== 'undefined'" title='Para remove mantenha a tecla pressionada e click aqui.'>
												<span style='padding-left: 2px;' v-if="column.id==controls.order.extras[column.id].field.id">
													<i v-if="controls.order.extras[column.id].sort == 'asc'" class="fa fa-sort-alpha-asc" style='color: #BBB;font-size: 12px;' aria-hidden="true"></i>
													<i v-if="controls.order.extras[column.id].sort == 'desc'" class="fa fa-sort-alpha-desc" style='color: #BBB;font-size: 12px;' aria-hidden="true"></i>
												</span>
											</span>
										</th>
									</tr>
								</thead>

								<tbody v-bind:style="{fontSize: controls.table.font.size + 'px'}">
									<tr v-for="item in result_list" class='clickable' v-bind:class="{selected: item.selected}" v-bind:title='item.project_description' v-on:click="select(item)" transition="staggered" stagger="100" style='height: 20.2px;'>
										<td v-for='column in fields' v-if='column.visible' style='padding-top: 0px;' v-bind:class='column.class'>
											<div v-if="column.type=='check'" v-bind:style='column.style'>
												<input type="checkbox" style='' v-model="item.selected">
											</div>

											<span v-if="column.type=='text' && item[column.id]!=null" v-html="highlight(item[column.id], controls.search, column)">
												{{ item[column.id].toUpperCase() }}
											</span>

											<span v-if="column.type=='logico' && item[column.id]!=null" style='text-align: center;'>
												<i v-if='item[column.id]==true' class="fa fa-check" style='color: #339966;text-align: center;display: inline-block;width: 100%;'></i>
												<i v-if='item[column.id]==false' class="fa fa-check" style='color: #999;text-align: center;display: inline-block;width: 100%;'></i>
											</span>

											<span v-if="column.type=='datetime' && item[column.id]!=null" v-html="highlight(item[column.id], controls.search, column)">
												{{ item[column.id] | datetime_format }}
											</span>
										</td>
									</tr>

									<template v-if='controls.paginate.activated'>
										<tr v-for="item in controls.table.rows.extra" style="height:30.2px;">
											<td v-for="column in fields" v-if="column.visible==true"></td>
										</tr>
									</template>
								</tbody>

								<app_table_footer :controls='controls' :fields='fields' :filters='filters' :data_size='data_size' :total_filtered='data.total_filtered'></app_table_footer>
							</table>
						</div>
					</div>
				</div>
				<span style="padding-left:6px;"><sub><b>Filtros:</b></sub></span>
				<span style="padding-left:6px;float:right;">
					<sub><b>
						<a style='padding:3px;cursor:pointer;' data-toggle="modal" data-target="#modal_filter">Adicionar</a>
						<a v-if='Object.keys(filters).length>0' style='padding:3px;cursor:pointer;' @click='remove_all_filters()' title='Remover todos os filtros'> / Remover todos</a>
					</b></sub>
				</span>

				<div class='clearfix'></div>
				<div class="well well-sm" style='height: 38px;padding-top:5px;padding-bottom:0px;padding-left: 4px;padding-right: 4px;'>
					<button v-for='filter in filters' class='label label-default' v-on:click='filters.pop(filter)' style='height: 24px;padding-left: 4px;padding-right: 8px;border-radius: 5px;color:#fff;border: 1px solid #fff;;'><!-- data-toggle="modal" data-target="#modal_filter"  -->
						<span v-if="filter.field.type=='text'">
						{{ filter.field.label }} {{ filter.comparation.label.toLowerCase() }} {{ filter.value.toUpperCase() }}
						</span>

						<span v-if="filter.field.type=='datetime'">
							{{ filter.value | datetime_format }} <i class="fa fa-times" aria-hidden="true"></i>
						</span>

						<span v-if="filter.field.type=='logico'" style='text-align: center;'>
							<span v-if="filter.value=='true'">{{ filter.field.label }} {{ filter.comparation.label.toLowerCase() }} à SIM</span>
							<span v-if="filter.value=='false'">{{ filter.field.label }} {{ filter.comparation.label.toLowerCase() }} à NÃO</span>
							 <i class="fa fa-times" aria-hidden="true"></i>
						</span>
					</button>
				</div>

				<app_form_modal id='modal_filter' title='Adicionar Filtro' :filters='filters' :fields='fields'></app_form_modal>
				<app_form_backup :list='data_list' :controls='controls' :object='object'></app_form_backup>
				<app_form_database :list='data_list' :controls='controls' :object='object'></app_form_database>
				<app_table_search :controls='controls' :fields='fields' :data_size='data_size'></app_table_search>

				<app_form_modal id='modal_filter' title='Adicionar Filtro' :filters='filters' :fields='fields'></app_form_modal>
				<app_form_project :list='data_list' :controls='controls' :object="object"></app_form_project>
			</div>
		</div>
	</div>
	`
})

Vue.component('app_form_cache', {
	mixins: [base_controller],
	props: ['list','controls','object'],
  data: function () {
    return {
    	object:{
				cache_ttl: null,
				cache_group: null,
				cache_key: null
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
				if (response.result){
					success_notify("Operação realizada com sucesso!","");
					if(scope.object.id){
						response.object.selected = false;
						scope.object = response.object;
						scope.object.selected = false;
						scope.controls.selected.registers = {};
					}
					else{
						scope.list.push(response.object);
					}
					document.getElementById("form_project").reset();
					$('#modal_project').modal('hide');
				}
				else{
					scope.errors = response.message;
				}
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			this.request('/api/project/save','post',data_paramters, null, success_function, failure_function);
		},
  },

	template: `
		<div id='modal_cache' class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<form id="form_cache" v-on:submit.prevent>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
							<h4 class="modal-title" id="myModalLabel">Configurar Cache	</h4>
						</div>
						<div id="home" style="padding-left: 15px; padding-right: 15px;">
							<div class="modal-body">
								<div class="tab-content">
									<sub>Opções de Backup</sub>
									<select id="backup_remote_plan" title="Opções de Backup" v-model="object.backup_remote_plan" :error="errors.backup_remote_plan" class='form-control'>
										<option value="WEEKLY" selected>Semanal</option>
										<option value="BIWEEKLY" selected>Quinzenal</option>
										<option value="MONTHLY" selected>Mensal</option>
										<option value="SEMESTER" selected>Semestral</option>
										<option value="YEARLY" selected>Anual</option>
									</select>
									<div class="row">
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="backup_remote_email" label="Conta do Backup" v-model="object.backup_remote_email" :error="errors.backup_remote_email" placeholder="" title="Informe um e-mail..." type="text"></app_field>
										</div>
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="backup_remote_token" label="Chave de Autorização" v-model="object.backup_remote_token" :error="errors.backup_remote_token" placeholder="" title="" type="text"></app_field>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-4 col-md-4 col-sm-4">
											<app_field id="backup_remote_size_max" label="Espaço na Nuvem" v-model="object.backup_remote_size_max" :error="errors.backup_remote_size_max" placeholder="" title="" type="text"></app_field>
										</div>
										<div class="col-lg-4 col-md-4 col-sm-4">
											<app_field id="backup_remote_size" label="Espaço Utilizado" v-model="object.backup_remote_size" :error="errors.backup_remote_size" placeholder="" title="Informe um e-mail..." type="text"></app_field>
										</div>
										<div class="col-lg-4 col-md-4 col-sm-4">
											<app_field id="backup_remote_size_used" label="Percentual Utilizado" v-model="object.backup_remote_size_used" :error="errors.backup_remote_size_used" placeholder="" title="" type="text"></app_field>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer" style='padding-top: 5px;padding-right:25px;border: 0px solid #fff;'>
							<button type="button" class="btn btn-sm btn-default" style='width: 120px;' v-on:click='save()'>Salvar</button><!-- data-dismiss="modal"  -->
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
  `
})