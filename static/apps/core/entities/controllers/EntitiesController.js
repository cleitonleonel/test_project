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

			entities: {
        data: ['aaaaaaaaaaaaaaaaa'],
        dict: {},
        loaded: false,
        errors: [],
      },
		}
	},
	methods: {
		load_entities: function() {
      var scope = this;
      var data_paramters = {};
      var success_function = function(response) {
        //alert("sucesso");
        scope.errors = response.message;
        scope.entities.data = response.object;
      };

      var failure_function = function(response) {
        //alert("failure_function");
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