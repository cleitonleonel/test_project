Vue.component('app-input', {
  props:['type', 'id', 'title', 'placeholder', 'classes', 'value'],
  template:
  `
  <input :type="type" :id="id" :title="title" :placeholder="placeholder" :class="classes" :value="value" @input="$emit('input', $event.target.value)" class="form-control">
  `
  ,
});

Vue.component('app-submit-button',{
  props: ['otma_login'],
  template:
      `
    <div>
      <button type="submit" class="btn btn-sm submit-button" @click="otma_login()">ENVIAR</button>
    </div>
    `
});
