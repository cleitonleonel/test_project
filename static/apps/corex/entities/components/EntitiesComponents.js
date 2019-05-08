Vue.component('app_entities_table',{
	props: ['data','form'],
	methods: {
		edit: function (key) {
			let scope = this;
			scope.form.id = scope.data[key].id;
			scope.form.type = scope.data[key].type;
			scope.form.official_document = scope.data[key].official_document;
			scope.form.name = scope.data[key].name;
			scope.form.popular_name = scope.data[key].popular_name;
			scope.form.activities = scope.data[key].activities;
			scope.form.company_relation = scope.data[key].company_relation;
			scope.form.status = scope.data[key].status;
			scope.form.nationality = scope.data[key].nationality;
			scope.form.comments = scope.data[key].comments;
		}
	},
	template:
	`
<table class="table-bordered table-hover" style="100%">
	<thead>
		<tr class="otma-font">
			<th>#</th>
			<th>Tipo</th>
			<th>Chave Oficial</th>
			<th>Nome</th>
			<th>Apelido</th>
			<th>Nacionalidade</th>
			<th>Relação</th>
			<th>Atividade</th>
			<th>Situação</th>
			<th>Criação</th>
			<th>Atualização</th>
		</tr>
	</thead>
	<tbody>
		<tr v-if="entity.data != ''" v-for="(entity, index) in data">
			<td style="padding-left: 5px;padding-right: 5px;"><a role="button" @click="edit(index)" class="btn btn-sm btn-primary" style="color: #ffffff;cursor: pointer;">Editar</a></td>
			<td>{{ entity.type }}</td>
			<td>{{ entity.official_document }}</td>
			<td>{{ entity.name }}</td>
			<td>{{ entity.popular_name }}</td>
			<td>{{ entity.nationality }}</td>
			<td>{{ entity.activities }}</td>
			<td>{{ entity.company_relation }}</td>
			<td>{{ entity.status }}</td>
			<td>{{ entity.creation_date }}</td>
			<td>{{ entity.last_update }}</td>
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
        alert('to enviando essa merda'+JSON.stringify(response.object));
        scope.entities.data.push(response.object);
      };

      let failure_function = function(response) {
        scope.errors = response.message;
      };

			let validation_function = function () {
        let result = true;
        let error_keys = {'official_document' : 'Documento', 'name' : 'Nome', 'popular_name' : 'Razão Social', 'nationality' : 'Nacionalidade', 'company_relation' : 'Relação com a empresa'};
        for(let field in data_paramters){
          if(!data_paramters[field]){
            error_notify(null,"Erro!","O caaaaampo de "+error_keys[field]+" é obrigatório.");
            result = false;
          }
        }

				if (!validate_cpf(data_paramters.official_document)){
					var strCpf = data_paramters.official_document;

					if (!/[0-9]{11}/.test(strCpf)) return false;
					if (strCpf === "00000000000") return false;

					var soma = 0;
					for (var i = 1; i <= 9; i++) {
							soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
					}

					var resto = soma % 11;
					if (resto === 10 || resto === 11 || resto < 2) {
							resto = 0;
					} else {
							resto = 11 - resto;
					}
					if (resto !== parseInt(strCpf.substring(9, 10))) {
							return false;
					}

					soma = 0;
					for (var i = 1; i <= 10; i++) {
							soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
					}

					resto = soma % 11;
					if (resto === 10 || resto === 11 || resto < 2) {
							resto = 0;
					} else {
							resto = 11 - resto;
					}
					if (resto !== parseInt(strCpf.substring(10, 11))) {
							return false;
					}

					return true;
				}

        if(!validate_cnpj(data_paramters.official_document)) {
        	var c = official_document;
          var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];

					if((c = c.replace(/[^\d]/g,"")).length != 14)
							return false;

					if(/0{14}/.test(c))
							return false;

					for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
						if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
								return false;

					for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
						if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
								return false;

					return true;
        }
        if(!validate_official_doc(data_paramters.official_document)) {
          error_notify(null,"Documento inválido","Confira se digitou corretamente os dígitos de seu cpf/cnpj.");
          result = false;
        }
        if(!validate_name_and_popular_name(data_paramters.name,data_paramters.popular_name)) {
          error_notify(null,"Nome ou razão social inválidos","Confira se digitou corretamente.");
          result = false;
        }
        if(!validate_nationality(data_paramters.nationality)) {
          error_notify(null,"Nacionalidade inválida","Confira se digitou corretamente sua nacionalidade.");
          result = false;
        }
        if(!validate_company_relation(data_paramters.company_relation)) {
          error_notify(null,"Relação com a 	empresa inválida","Confira se digitou corretamente sua relação com a empresa.");
          result = false;
        }
        return result;
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
			<app_field label="CPF" title="Digite seu CPF" id="official_document" classes="form-control" v-model="data.official_document"  v-if="data.type =='PF'"></app_field>
			<app_field label="CNPJ" title="Digite seu CNPJ" id="official_document" classes="form-control" v-model="data.official_document" v-if="data.type == 'PJ'"></app_field>
			<app_field_disabled placeholder="Escolha um tipo de entidade" classes="form-control" v-if="!data.type" style="margin-top: 23px;"></app_field_disabled>
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
		<div class="col-6 text-left">
			<sub style='text-align:left;padding-left:8px;color:#888;margin-top: 1px;'>Atividades Exercidas</sub>
			<select multiple title="Selecione os tipo de atividade que a entidade exerce" id="activities" class="form-control" v-model="data.activities" size="5">
				<option v-for="op in options.activities" :value="op.value">{{ op.label }}</option>
			</select>
			atividades: {{data.activities}}
		</div>
		<div class="col-6 text-left">
			<sub style='text-align:left;padding-left:8px;color:#888;margin-top: 1px;'>Relação com a Empresa</sub>
			<select multiple title="Selecione os tipos de relações da entidade com a empresa" id="activities" class="form-control" v-model="data.company_relation" size="5">
				<option v-for="op in options.company_relation" :value="op.value">{{ op.label }}</option>
			</select>
			atividades: {{data.company_relation}}
			<!--<app_select_multiple label="Relação com a Empresa" title="Selecione os tipos de relações da entidade com a empresa" :options="options.company_relation" id="company_relation" classes="form-control" v-model="data.company_relation" size="5"></app_select_multiple>-->
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
			<app_button text="Enviar" classes='form-control btn btn-primary' title='Clique aqui para enviar' :callback='save' type="submit"></app_button>
		</div>		
	</div>
</form>
	`
});