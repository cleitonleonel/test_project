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
  		<input :id="id" v-if='error' value="ERRO" :class="classes" :type="type" @input="$emit('input', $event.target.value)" :placeholder="placeholder" :title="title">
  		<input :id="id" v-else :value="value" :class="classes" :type="type" @input="$emit('input', $event.target.value)" :placeholder="placeholder" :title="title">
  		<label v-if='error' style='font-size:10px;color: #c84141;position:relative;top:0px;float:right;'>{{ error }}</label>
  		<div v-if='error' class='clearfix'></div>
		</div>
  	`
});

Vue.component('app_field_disabled', {
	props: ['id', 'value', 'label', 'classes', 'error', 'placeholder', 'title', 'type'],

  template: `
  	<div class='' style='text-align:left;'>
  		<sub v-if="label" style='text-align:left;padding-left:8px;color:#888;'>{{ label }}</sub>
  		<input :id="id" v-if='error' value="ERRO" :class="classes" :type="type" @input="$emit('input', $event.target.value)" :placeholder="placeholder" :title="title" disabled>
  		<input :id="id" v-else :value="value" :class="classes" :type="type" @input="$emit('input', $event.target.value)" :placeholder="placeholder" :title="title" disabled>
  		<label v-if='error' style='font-size:10px;color: #c84141;position:relative;top:0px;float:right;'>{{ error }}</label>
  		<div v-if='error' class='clearfix'></div>
		</div>
  	`
});

Vue.component('app_select', {
	props: ['value','options', 'id', 'label', 'classes', 'title'],
	template:`
		<div style="text-align: left;">
			<sub v-if="label" style='text-align:left;padding-left:8px;color:#888;'>{{ label }}</sub>
			<select class='form-control' :value="value" tabindex='' @input="$emit('input', $event.target.value);" :title="title">
				<option v-for='item in options' :value="item.value">{{ item.label }}</option>
			</select>
		</div>
	`
});

Vue.component('app_select_multiple', {
	props: ['value','options', 'id', 'label', 'classes', 'title','size'],
	template:`
		<div style="text-align: left;">
			<sub v-if="label" style='text-align:left;padding-left:8px;color:#888;'>{{ label }}</sub>
			<select class='form-control' :value="value" tabindex='' @input="$emit('input', $event.target.value);" :title="title" multiple :size="size">
				<option v-for='item in options' :value="item.value">{{ item.label }}</option>
			</select>
		</div>
	`
});

