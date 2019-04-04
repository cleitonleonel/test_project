Vue.component('app-login-form',{
  template:
`
<form>
  <div class="login">       
    <app-input-group type="text" id="user" title="Usuário" placeholder="Usuário" required="required" classes="fas fa-user"></app-input-group>
  </div>
  <div class="password">
    <app-input-group type="password" id="password"title="Senha" placeholder="Senha" required="required" classes="fas fa-lock"></app-input-group>
  </div>  
  <div>
    <app-submit-button class="center"></app-submit-button>
  </div>
</form>
`
});