Vue.component('app_input', {
  props:['type', 'id', 'title', 'classes', 'value', 'placeholder'],
  template:
  `
  <input :id="id" :class="classes" :type="type" :placeholder="placeholder" :title="title" :value="value"  @input="$emit('input', $event.target.value)">
  `
  ,
});

Vue.component('app_button',{
  props: ['type', 'text', 'classes', 'title', 'callback'],
  template:
    `
    <button :type="type" :class="classes" @click="callback()" :title='title'>{{ text }}</button>
    `
});


Vue.component('app_field', {
	props: ['id', 'value', 'label', 'classes', 'error', 'placeholder', 'title', 'type'],

  template: `
  	<div class='' style='text-align:left;'>
  		<sub v-if="label" style='text-align:left;padding-left:8px;color:#888;'>{{ label }}</sub>
  		<input :id="id" v-if='error' value="ERRO" :class="classes" :type="type" v-on:input="$emit('input', $event.target.value)" :placeholder="placeholder" :title="title">
  		<input :id="id" v-else :value="value" :class="classes" :type="type" v-on:input="$emit('input', $event.target.value)" :placeholder="placeholder" :title="title">
  		<label v-if='error' style='font-size:10px;color: #c84141;position:relative;top:0px;float:right;'>{{ error }}</label>
  		<div v-if='error' class='clearfix'></div>
		</div>
  	`
})


