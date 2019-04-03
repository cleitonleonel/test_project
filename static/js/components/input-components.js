Vue.component('app_field', {
	props: ['id', 'value', 'label', 'error', 'placeholder', 'title', 'type'],
  data: function () {
    return {
    }
  },
  template:
    `
  	<div class=''>
  		<label v-if="label!=''" style='font-weight: normal;margin-left:4px;'><sub>{{ label }}</sub></label>
  		<input v-bind:id="id" class='form-control' v-bind:value="value" v-on:input="$emit('input', $event.target.value)" v-bind:class="{'wrong_field': error}" v-bind:placeholder="placeholder" v-bind:title="title" v-bind:type="type">
  		<label v-if='error' class="label_error">{{ error }}</label>
		</div>
    `
});