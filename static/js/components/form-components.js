Vue.component('app-login-form',{
  template:
`
<form>
  <div class="login">       
    <app-input-group type="text" id="user" title="Usuário" placeholder="Usuário" classes="round-border" required="required"></app-input-group>
  </div>
  <div class="password">
    <app-field id="password" placeholder="Senha" title="Senha" type="password" required="required" classes="round-border"></app-field>
  </div>  
  <div>
    <app-submit-button class="center"></app-submit-button>
  </div>
</form>
`
});