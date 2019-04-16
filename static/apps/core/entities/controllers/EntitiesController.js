let app = new Vue({
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

			entities: {
        data: [],
        dict: {},
        loaded: false,
        errors: [],
      },
		}
	},
	methods: {
		load_entities: function() {
      let scope = this;
      let data_paramters = {};
      let success_function = function(response) {
        scope.errors = response.message;
        scope.entities.data = response.object;
      };

      let failure_function = function(response) {
        scope.errors = response.message;
        scope.entities.loaded = null;
      };

      this.request('/api/ent/load/', 'get', data_paramters, null, success_function, failure_function);
    },
	},

	mounted: function() {
    this.load_entities();
	},
});