var app = new Vue({
  el: '#app',
  mixins: [base_controller],
  data: {
    screen_width: window.screen.availWidth,
    screen_height: window.screen.availHeight,
    limit_rows: (window.screen.availHeight-80)/34,

		font_size: 10,
		font_increase: 0,
		table_bordered: false,

    selected_objects: {},
    selected_counter: 0,
    objects_counter: 0,
    all_selected: false,

  	objects: {},
    errors:{}
  },
  methods: {
		load: function(){
			var scope = this;
			var data_paramters = {};
			var success_function = function(response){
				scope.objects = response.object;
				scope.objects_counter = response.object.length;
				scope.errors = response.message;
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}
			this.request('/api/dependency_register/','get',data_paramters, null, success_function, failure_function);
		},

		select: function(object){
			if(object.selected){
				this.unselect_register(object);
			}
			else{
				this.select_register(object);
			}
		},

		select_all: function(){
			if (this.all_selected == false){
				this.selected_objects = this.objects.reduce((obj, item) => {
					obj[item.id] = item;
					item.selected = true;
				return obj
				}, {})
				this.all_selected = true;
			}
			else{
				this.selected_objects = this.objects.reduce((obj, item) => {
					item.selected = false;
				return obj
				}, {})
				this.all_selected = false;
			}
		},

		exclude: function(object){
			var scope = this;
			var first_element = object[Object.keys(object)[0]];
			var data_paramters = {
				'id':first_element.id,
			}

			var success_function = function(response){
				//first_element.selected = false;
				//delete scope.selected_objects[first_element.id];
				//this.selected_counter = this.selected_counter - 1;
				scope.unselect_register(first_element);
				scope.objects.pop(first_element);
				success_notify(null,"Operação realizada com sucesso! Objeto apagado");

				scope.objects_counter = scope.objects_counter - 1;
				scope.errors = response.message;
			}

			var failure_function = function(response){
				error_notify(null,"Falha na operação.");
				scope.errors = response.message;
			}

			this.request('/api/dependency_delete/','post',data_paramters, null,success_function, failure_function);

		},

		increase_font: function(){
			if (this.font_size < 18){
				this.font_size = this.font_size + 1;
				this.font_increase = this.font_increase + 1;
			}
		},
		reduce_font: function(){
			if (this.font_size > 10){
				this.font_size = this.font_size - 1;
				this.font_increase = this.font_increase + 1;
			}
		},
		change_table_design: function(){
			this.table_bordered = !this.table_bordered;
		},

		select_register: function(object){
			object.selected = true;
			this.selected_objects[object.id] = object;
			this.selected_counter = this.selected_counter + 1;
		},

		unselect_register: function(object){
			object.selected = false;
				delete this.selected_objects[object.id];
				this.selected_counter = this.selected_counter - 1;
		},

	},
	beforeMount: function(){
		this.load();
	},
	mounted: function(){

	},

})