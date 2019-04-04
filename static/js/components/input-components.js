Vue.component('app-raw-input',{
  props:
      ['id',
        'value',
        'label',
        'error',
        'placeholder',
        'title',
        'type',
        'required',
        'classes'
      ],
  template:
  `
  <input
   class="form-control"
   :required="required"
   :id="id"
   :value="value"
   @input="$emit('input', $event.target.value)"
   :class="[{ 'wrong_field': error }, classes]"
   :placeholder="placeholder"
   :title="title"
   :type="type">
  `
});

Vue.component('app-field', {
	props: ['id', 'value', 'label', 'error', 'placeholder', 'title', 'type','required', 'classes'],
  data: function () {
    return {
    }
  },
  template:
    `
  	<div class=''>
  		<label v-if="label!=''" style='font-weight: normal;margin-left:4px;'><sub>{{ label }}</sub></label>
  		<app-raw-input
  		 class="form-control"
       :required="required"
       :id="id"
       :value="value"
       @input="$emit('input', $event.target.value)"
       :class="{'wrong_field': error, classes}"
       :placeholder="placeholder"
       :classes="classes"
       :title="title"
       :type="type"></app-raw-input>
  		<label v-if='error' class="label_error">{{ error }}</label>
		</div>
    `
});

Vue.component('app-input-group',{
  props:['type', 'id', 'error', 'title','placeholder', 'classes', 'required'],
  template:
  `
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text round-border" id="basic-addon1"><i :class="[, classes]"></i></span>
      </div>
      <app-raw-input
       type="text"
       id="login"
       title="Usuário"
       placeholder="Usuário"      
       classes="round-border" 
       required="required"
       aria-describedby="basic-addon1"></app-raw-input>
    </div>
  </div>
  `
});

Vue.component('app-submit-button',{
  template:
`
<div>
  <button type="submit" class="btn btn-sm submit-button round-border login-header" style="margin-top: 10px;">ENVIAR</button>
</div>
`
});