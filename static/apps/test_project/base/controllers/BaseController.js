var time_lib = {
	data: {
		initial_time: null,
		terminate_time: null,
		duration_time: null
	},
	methods: {
		init_process: function(){
			NProgress.start();
			this.initial_time = Date.now();
 		},
 		terminate_process: function(redirect){
			this.terminate_time = Date.now();
			this.duration_time = (this.terminate_time - this.initial_time)/1000;

			try{
				document.getElementById('session_action_info').innerHTML = 'Requisição processado em '+duration_request+'ms.';
				$("#footer_session_action").fadeIn(100);
				setTimeout(function(){$("#footer_session_action").fadeOut(5000);},5000)
			}
			catch(err) {
			}
			NProgress.done();
 		}
	}
}

var notify_lib = {
	methods: {
		verify_errors: function(response){
			if (typeof response.message === 'string') {
				error_notify(null,"Falha na operação", response.message);
			}
		}
	}
}

var response_lib = {
	methods: {
		process_response: function(data, success_function, failure_function){
			this.response = $.parseJSON(data);
			if (this.response['result'] == true) {
				if (success_function){
					success_function(this.response);
				}
			}

			else {
				this.verify_errors(this.response);
				if (failure_function && (typeof(this.response.message) != 'string')){
					failure_function(this.response);
				}
			}

			this.terminate_process(this.response);
			return this.response['result'];
		}
	}
}

var request_lib = {
	data: {
		response: null
	},
	methods: {
		get_csrftoken: function(){
			return jQuery("[name=csrfmiddlewaretoken]").val();
 		},

 		check_permission_error: function(data){
			if (data.indexOf('ERRO403') == -1) {
				return true;
			}
			return false;
		},

 		execute_call: function(url, method, data_paramters, success_function, failure_function){
 			var self = this;
			$.ajax({
				type: method,
				url: url,
				data: data_paramters,
				success: function(data){
					if (self.check_permission_error(data)==true){
						return self.process_response(data, success_function, failure_function);
					}
					else{
						return error_notify(null, "Operação não autorizada", "Nível de autonomia não permite o acesso à este recurso.");
					}
				},
				failure: function(data){
					NProgress.done();
					return false;
					//register_action(start_request,status.request_path, status.request_size, status.server_processing_time_duration, status.cliente_processing_time_duration)
				}
			});
 		}
	}
}

var api_lib = {

	methods: {
		load: function(url){
			var scope = this;
			var data_paramters = {};
			var success_function = function(response){
				scope.data_list = response.object;
				scope.data_size = response.object.length;
				scope.form.errors = response.message;
				if(scope.data_size < scope.limit_rows){
					scope.controls.paginate.total = 1;
				}
				else{
					scope.controls.paginate.total = Math.ceil(scope.data_size/scope.controls.table.rows.limit)//Math.round(scope.data_size/scope.limit_rows);
				}

			}

			var failure_function = function(response){
				scope.form.errors = response.message;
			}
			this.request(url,'get',data_paramters, null, success_function, failure_function);
		},
	}
}

var line_height = null;

try{
	line_height = $("#check_line").offset().top;
}
catch(err){
	line_height = 0;
}

var base_controller = {
	mixins: [api_lib, request_lib, response_lib, notify_lib, time_lib],
	data: function () {
		return {
		data_list:[],
		data_size: 0,

		have_status: false,
		screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    table_initial_position: line_height,
		table_line_height: 26,
		limit_rows: 0,
		font_size: 10,
		font_increase: 0,
		search_text: '',

		current_page: 0,
		total_pages: 0,
		}
	},
	methods: {
		request: function(url, method, data_paramters, validations, success_function, failure_function){
			this.init_process();
			if (method == 'post'){
				data_paramters['csrfmiddlewaretoken'] = this.get_csrftoken();
			}
			if (validations==null || validations()){
				this.execute_call(url, method, data_paramters, success_function, failure_function);
			}
			else{
				this.result = false;
			}
			this.terminate_process();
		},

		onResize: function() {
      this.screen_width = window.innerWidth;   //window.screen.availWidth;
			this.screen_height = window.innerHeight; //window.screen.availHeight;
			try{
				this.table_initial_position = $("#check_line").offset().top;
				this.table_line_height = $("#check_line").height()+20;
				if (this.table_line_height > 38){
					this.table_line_height = 36;
				}
				this.limit_rows =	Math.ceil((this.screen_height-this.table_initial_position)/this.table_line_height);
				if(this.limit_rows < 3){
					this.limit_rows = 3;
				}
			}
			catch(err){
			}
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
				this.font_increase = this.font_increase - 1;
			}
		},
		select_page: function(page){
			this.current_page = page-1;
		},

		first_page: function(){
			this.current_page = 0;
		},

		before_page: function(){
			if(this.current_page > 0){
				this.current_page = this.current_page-1;
			}
		},
		next_page: function(){
			if(this.current_page < this.total_pages-1){
				this.current_page = this.current_page + 1;
			}
		},

		last_page: function(){
			this.current_page = this.total_pages - 1;
		},

	},
	updated: function(){
		//this.onResize();
	},

	beforeMount: function(){
		this.onResize();
	},
	computed: {
		countriesToDisplay: function() {
			var scope = this;
      var result = this.objects.filter(function(item){
				if(scope.search_text != ""){
					return item.full_name.search(new RegExp(scope.search_text, "i")) != -1
				}
				return true;
			});

			this.total_pages = Math.ceil(result.length/this.limit_rows);
			return result.slice(this.current_page*this.limit_rows, this.current_page*this.limit_rows+this.limit_rows);
    },
	},
	filters: {
    datetime_format: function (date) {
    	if (date != null && date != ''){
				return moment(date).format('DD/MM/YYYY - hh:mm:ss');
			}
			else{
				return '';
			}
      //return moment(date).format('DD/MM/YYYY - hh:mm:ss');
    },
  },
  created: function() {
		window.addEventListener('resize',this.onResize);
	},
	destroyed: function() {
		window.removeEventListener('resize', this.onResize);
	},
}

