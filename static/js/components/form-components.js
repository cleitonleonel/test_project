Vue.component('app-login-form',{
  props: ['otma_login','object'],
  template:
`
<form @submit.prevent>
  <div class="login">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-user"></i></span>
      </div>
      <app-input type="text" id="username" title="Usuário" placeholder="Usuário" v-model="object.username"></app-input>
    </div>           
  </div>
  <div class="password" style="margin-top: 10px;">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-lock"></i></span>
      </div>
      <app-input type="password" id="password" title="Senha" placeholder="Senha" v-model="object.password"></app-input>
    </div>        
  </div>  
  <div style="margin-top: 10px;">
    <app-submit-button class="text-center" :otma_login="otma_login"></app-submit-button>
  </div>
</form>
`
});