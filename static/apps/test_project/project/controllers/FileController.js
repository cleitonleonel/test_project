var app_file = new Vue({
  el: '#app_file',
  mixins: [base_controller],
  data: {
    file:{
      view_mode: true,
      title:'',
      size: '450 KB',

      html:{
        content: null,
        loaded: false
      },
      details:{
        content: null,
        loaded: false
      },
    },
    errors:{}
  },

  methods: {
    switch_mode: function(){
      this.file.view_mode = !this.file.view_mode;
    },

    load_file_html: function(){
			var scope = this;
			var data_paramters = {};
			var success_function = function(response){
				if (response.result){
					success_notify("Operação realizada com sucesso!","");
					scope.file.html.content = response.object;
				  scope.file.html.loaded = true;
				}
				else{
					scope.errors = response.message;
				}
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}
			this.request('/api/project/project_ivis/file/apps/core/api.py/html','get',data_paramters, null, success_function, failure_function);
		},

		load_file_details: function(){
			var scope = this;
			var data_paramters = {};
			var success_function = function(response){
				if (response.result){
					success_notify("Operação realizada com sucesso!","");
					scope.file.details.content = response.object;
				  scope.file.details.loaded = true;
				}
				else{
					scope.errors = response.message;
				}
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}
			this.request('/api/project/project_ivis/file/apps/core/api.py/details','get',data_paramters, null, success_function, failure_function);
		},
  },

	beforeMount: function(){
	},

	mounted: function(){
	  //this.load_file_details();
	  this.load_file_html();
	},
})