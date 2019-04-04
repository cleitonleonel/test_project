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
  props:['type', 'id', 'error', 'title','placeholder', 'classes', 'required','object'],
  template:
  `
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text round-border" id="basic-addon1"><i :class="[, classes]"></i></span>
      </div>
      <app-raw-input
       :type="type"
       :id="id"
       :title="title"
       :placeholder="placeholder"      
       classes="round-border" 
       :required="required"
       :object="object"
       aria-describedby="basic-addon1"></app-raw-input>
    </div>
  </div>
  `
});

Vue.component('app-raw-input',{
  props:
      ['id',
        'value',
        'error',
        'placeholder',
        'title',
        'type',
        'required',
        'classes',
        'vmodel'
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
   :type="type"
   v-model="vmodel">
  `
});

Vue.component('app-submit-button',{
  props: ['otma_login'],
  template:
      `
<div>
  <button type="submit" class="btn btn-sm submit-button round-border login-header" @click="otma_login()" style="margin-top: 10px;">ENVIAR</button>
</div>
`
});
