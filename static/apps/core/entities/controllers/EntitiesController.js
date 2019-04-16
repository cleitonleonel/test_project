var app = new Vue({
  el: '#app_entities',
  mixins: [base_controller],
  data: function() {
    return {
			forms: {
				entity:{
					object:{
						name:null,
						type:null
					},
					errors:{},
					selected:{
						index: null,
						register: null
					},
				},
			},
		}
	},
	methods: {

	},
});