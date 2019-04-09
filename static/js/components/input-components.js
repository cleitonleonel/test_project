Vue.component('app-input', {
  props:['type', 'id', 'title', 'placeholder', 'classes', 'value'],
  template:
  `
  <input :type="type" :id="id" :title="title" :placeholder="placeholder" :class="classes" :value="value" @input="$emit('input', $event.target.value)" class="form-control">
  `
  ,
});

Vue.component('app-submit-button',{
  props: ['passing'],
  template:
      `
    <div>
      <button type="submit" class="btn btn-sm submit-button round-border login-header" :passing="passing "@click="passing()" style="margin-top: 10px;">ENVIAR</button>
    </div>
    `
});
