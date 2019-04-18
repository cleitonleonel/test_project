var app = new Vue({
  el: '#app',
  mixins: [base_controller],
  data: {
		table_bordered: false,
    selected_objects: {},
    selected_counter: 0,
    objects_counter: 0,
    search_by: 'nome',
    visible_search: false,
    all_selected: false,
  	objects: [],
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
				scope.total_pages = Math.round(scope.objects_counter/scope.limit_rows);
				//alert("olha quem vai ser o total: "+scope.total_pages)
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}
			this.request('/api/user/','get',data_paramters, null, success_function, failure_function);
		},
		select: function(object){
			if(object.selected){
				object.selected = false;
				delete this.selected_objects[object.id];
				this.selected_counter = this.selected_counter - 1;
			}
			else{
				object.selected = true;
				this.selected_objects[object.id] = object;
				this.selected_counter = this.selected_counter + 1;
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
		change_table_design: function(){
			this.table_bordered = !this.table_bordered;
		},
	},
	beforeMount: function(){
		this.load();
	},
})