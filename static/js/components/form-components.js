Vue.component('app-login-form',{
  props: ['otma_login','object'],
  template:
`
<form @submit.prevent>
  <div class="login">       
    <app-input type="text" id="username" title="Usuário" placeholder="Usuário" classes="round-border" v-model="object.username"></app-input>
  </div>
  <div class="password" style="margin-top: 10px;">
    <app-input type="password" id="password" title="Senha" placeholder="Senha" classes="round-border" v-model="object.password"></app-input>
  </div>  
  <div>
    <app-submit-button class="center" :otma_login="otma_login"></app-submit-button>
  </div>
</form>
`
});