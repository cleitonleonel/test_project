Vue.component('app_entities_table',{
	props: ['data'],
	template:
	`
<table class="table-bordered table-hover" style="100%">
	<thead>
		<tr class="otma-font">
			<th>Tipo</th>
			<th>Chave Oficial</th>
			<th>Nome</th>
			<th>Apelido</th>
			<th>Nacionalidade</th>
			<th>Relação</th>
			<th>Situação</th>
			<th>Data de Criação</th>
			<th>Ultima Atualização</th>
			<th>Modificações</th>
			<th>Variáveis</th>
			<th>Comentários</th>
		</tr>
	</thead>
	<tbody>
		<tr v-if="entity.data != ''" v-for="entity in data">
			<td>{{ entity.type }}</td>
			<td>{{ entity.official_doc }}</td>
			<td>{{ entity.name }}</td>
			<td>{{ entity.popular_name }}</td>
			<td>{{ entity.nationality }}</td>
			<td>{{ entity.company_relation }}</td>
			<td>{{ entity.status }}</td>
			<td>{{ entity.creation_date }}</td>
			<td>{{ entity.last_update }}</td>
			<td>{{ entity.modifications }}</td>
			<td>{{ entity.variables }}</td>
			<td>{{ entity.comments }}</td>
		</tr>
		<tr v-else>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>
	`
});

Vue.component('app_entities_form',{
	mixins:[base_controller],
	props:['data','options','where'],
	methods: {
		save: function () {
			let scope = this;
      let data_paramters = scope.data;
      alert('INDEX:'+JSON.stringify(data_paramters));
      let success_function = function(response) {
        alert(JSON.stringify(response.object));
        scope.entities.data.push(response.object);
      };

      let failure_function = function(response) {
        scope.errors = response.message;
      };

      this.request('/api/entities/save/', 'post', data_paramters, null, success_function, failure_function);
		}
	},
	template:
	`
<form>
	<div class="row">
		<div class="col-6">
			<app_select label="Tipo de Entidade" title="Selecione o tipo de entidade" :options="options.type" id="type" classes="form-control" v-model="data.type"></app_select>
		</div>
		<div class="col-6">
			<app_field label="CPF" title="Digite seu CPF" id="official_doc" classes="form-control" v-model="data.official_doc" v-if="data.type == 'PF'"></app_field>
			<app_field label="CNPJ" title="Digite seu CNPJ" id="official_doc" classes="form-control" v-model="data.official_doc" v-if="data.type == 'PJ'"></app_field>
			<app_field_disabled placeholder="Escolha um tipo de entidade" classes="form-control" v-if="!data.type" style="margin-top: 24px;"></app_field_disabled>
		</div>
	</div>
	<div class="row">
		<div class="col-6">
			<app_field label="Nome" title="Digite o nome da entidade" classes="form-control" type="text" id="name" v-model="data.name" v-if="data.type == 'PF'"></app_field>
			<app_field label="Razão Social" title="Digite a razão social da entidade" classes="form-control" type="text" id="name" v-model="data.name" v-if="data.type == 'PJ'"></app_field>
			<app_field_disabled placeholder="Escolha um tipo de entidade" classes="form-control" v-if="!data.type" style="margin-top: 24px;"></app_field_disabled>
		</div>
		<div class="col-6">
			<app_field label="Apelido" title="Digite o nome da entidade" classes="form-control" type="text" id="popular_name" v-model="data.popular_name" v-if="data.type == 'PF'"></app_field>
			<app_field label="Nome Fantasia" title="Digite a razão social da entidade" classes="form-control" type="text" id="popular_name" v-model="data.popular_name" v-if="data.type == 'PJ'"></app_field>
			<app_field_disabled placeholder="Escolha um tipo de entidade" classes="form-control" v-if="!data.type" style="margin-top: 24px;"></app_field_disabled>
		</div>
	</div>	
	<div class="row">
		<div class="col-6">
			<app_select_multiple label="Atividades da Entidade" title="Selecione os tipo de atividade que a entidade exerce" :options="options.activities" id="activities" classes="form-control" v-model="data.activities" size="5"></app_select_multiple>
		</div>
		<div class="col-6">
			<app_select_multiple label="Relação com a Empresa" title="Selecione os tipos de relações da entidade com a empresa" :options="options.company_relation" id="company_relation" classes="form-control" v-model="data.company_relation" size="5"></app_select_multiple>
		</div>
	</div>
	<div class="row">
		<div class="col-6">
			<app_select label="Situação" title="Selecione a situação da entidade" :options="options.status" id="status" classes="form-control" v-model="data.status"></app_select>
		</div>
		<div class="col-6">
			<app_field label="Nacionalidade" title="Digite a nacionalidade da entidade" classes="form-control" type="text" id="nationality" v-model="data.nationality"></app_field>
		</div>
	</div>
	<div class="row">
		<div class="col-12 text-left">
			<sub style='text-align:left;padding-left:8px;color:#888;'>Comentários</sub>
			<textarea style="width: 100%;" class="form-control" v-model="data.comments"></textarea>
		</div>		
	</div>
	<div class="row" style="margin-top: 10px;">
		<div class="col-12">
			<app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='save' type="button"></app_button>
		</div>		
	</div>
</form>
	`
});