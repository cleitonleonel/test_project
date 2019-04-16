Vue.component('app_entities_table',{
	props: ['data'],
	template:
	`
<table class="table-bordered table-hover table-striped" style="100%">
	<thead>
		<tr class="otma-font">
			<th>Tipo</th>
			<th>Chave Oficial</th>
			<th>Nome</th>
			<th>Razão Social</th>
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
		<tr v-if="entity.data" v-for="entity in data">
			<td>{{ entity.type }}</td>
			<td>{{ entity.official_key }}</td>
			<td>{{ entity.name }}</td>
			<td>{{ entity.popular_name }}</td>
			<td>{{ entity.nationality }}</td>
			<td>{{ entity.relations_company }}</td>
			<td>{{ entity.status }}</td>
			<td>{{ entity.creation_date }}</td>
			<td>{{ entity.last_update }}</td>
			<td>{{ entity.modifications }}</td>
			<td>{{ entity.variables }}</td>
			<td>{{ entity.comments }}</td>
		</tr>
		<tr v-else>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
			<td>a</td>
		</tr>
	</tbody>
</table>
	`
});