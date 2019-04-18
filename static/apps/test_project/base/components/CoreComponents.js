Vue.component('app_form_login', {
	props: ['id','object','errors', 'submit_action'],
  data: function () {
    return {
      count: 0
    }
  },

  template: `
  	<form v-bind:id="id" v-on:submit.prevent>
  		<app_field id="username" v-model="object.username" :error="errors.username" placeholder="Usuário.." title="Informe o seu usuário.." type="text"></app_field>
  		<br>
			<app_field id="password" v-model="object.password" :error="errors.password" placeholder="Senha.." title="Informe o sua senha.." type="password"></app_field>
			<br>
			<div>
				<button id="button_send" type="submit" class="btn btn-primary btn-sm submit form-control" v-on:click="submit_action">Entrar</button>
			</div>
		</form>
  	`
})

