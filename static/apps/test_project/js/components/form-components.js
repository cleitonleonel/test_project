Vue.component('app-login-form',{
  props: ['passing','object'],
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
    <app-submit-button class="text-center" :passing="passing"></app-submit-button>
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
    <input type="text" required="required" name="firstname" v-model="object.first_name" maxlength="50">
  </div>

  <div>
    <sub>Sobrenome:</sub>
    <input type="text" required="required" name="familyname" v-model="object.family_name" maxlength="100">
  </div>

  <div>
    <sub>E-mail:</sub>
    <input type="email" required="required" class="input-text" name="email"  v-model="object.email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" >
  </div>

  <div>
    <sub>Senha:</sub>
    <input type="password" required="required" name="firstpass" v-model="object.password"  maxlength="50">
  </div>

  <div>
    <sub>Confirme a senha:</sub>
    <input type="password" required="required" name="secondpass" v-model="object.confirm_password" maxlength="50">
  </div>

  <div>
    <app-submit-button class="center" :passing="passing"></app-submit-button>
  </div>
</form>
`
});