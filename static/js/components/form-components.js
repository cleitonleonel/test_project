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

Vue.component('app-signin-form',{
  props: ['passing', 'object'],
  template:
`
<form @submit.prevent>
  <div>
    <sub>Username:</sub>
    <input type="text" required="required" name="username" v-model="object.username" maxlength="20">
  </div>

  <div>
    <sub>Primeiro nome:</sub>
    <input type="text" required="required" name="firstname" v-model="object.firstname" maxlength="50">
  </div>

  <div>
    <sub>Sobrenome:</sub>
    <input type="text" required="required" name="familyname" v-model="object.familyname" maxlength="100">
  </div>

  <div>
    <sub>E-mail:</sub>
    <input type="email" required="required" class="input-text" name="email"  v-model="object.email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" >
  </div>

  <div>
    <sub>Senha:</sub>
    <input type="password" required="required" name="firstpass" v-model="object.firstpass"  maxlength="50">
  </div>

  <div>
    <sub>Confirme a senha:</sub>
    <input type="password" required="required" name="secondpass" v-model="object.secondpass" maxlength="50">
  </div>

  <div>
    <app-submit-button class="center" :passing="passing"></app-submit-button>
  </div>
</form>
`
});