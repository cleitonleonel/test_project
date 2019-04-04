Vue.component('app-login-form',{
  props: ['otma_login', 'object'],
  template:
`
<form @submit.prevent>
  <div class="login">       
    <app-input-group type="text" id="username" title="Usuário" placeholder="Usuário" required="required" classes="fas fa-user" :object="object"></app-input-group>
  </div>
  <div class="password">
    <app-input-group type="password" id="password"title="Senha" placeholder="Senha" required="required" classes="fas fa-lock" :object="object"></app-input-group>
  </div>  
  <div>
    <app-submit-button class="center" :otma_login="otma_login"></app-submit-button>
  </div>
</form>
`
});