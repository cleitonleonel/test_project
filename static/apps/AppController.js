Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

let app = new Vue({
  el: '#app',
  mixins: [base_controller],
  data: function() {
    return {
      diego: "pasti",
      app: {
        controls:{
          contextmenu:{
            contextoptions:{
              global: [
                {'label':"Sair", "options":[]},
              ],
              local: [],
            }
          }
        }
      },
      forms: {
        change_password:{
					object:{
						old_password: null,
						password:null,
	          confirm_password: null
					},
					errors:{},
					selected:{
						index: null,
						register: null
					},
				},
      },

			user: {
				session:{
					is_blocked: null,
				}
			},

			username: null,
      password: null,

      controls: {
        page: {
          loaded: false,
        },
        session:{
          timeout_warning:1400000,
					timeout_close:1500000,
					warning_timer: null,
					closer_timer: null,
        },
        session_activity: true,
        session_blocked: false,
      }
    }
	},

	methods: {
		init_timers: function(){
			let scope = this;
			if(this.controls.session_blocked==false){
				this.controls.session.warning_timer = setTimeout(scope.alert_inactivity, this.controls.session.timeout_warning);
	      this.controls.session.closer_timer = setTimeout(scope.block_session, this.controls.session.timeout_close);
      }
		},

		reset_timers: function(){
			let scope = this;
			if(this.user.session.is_blocked==false){
				clearTimeout(this.controls.session.warning_timer);
				clearTimeout(this.controls.session.closer_timer);
				$("#warning_session").modal('hide');
		    scope.init_timers();
		  }
		},

		alert_inactivity: function(){
			if(this.controls.session_blocked==false){
				$("#warning_session").modal('show');
			}
		},

		block_session: function (){
			$("#warning_session").modal('hide');
			clearTimeout(this.controls.session.timeout_warning);
			clearTimeout(this.controls.session.timeout_close);
			//this.controls.session_blocked = true;

			let scope = this;
			let data_paramters = {};

			let success_function = function(response){
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
				scope.user.session.is_blocked = response.object.session.is_blocked;

			};

			let failure_function = function(response){
				//error_notify(null,'Senha inválida',"Senha preenchida incorretamente ou não existe")
				//scope.form.errors = response.message;
			};

			let validation_function = function () {
				let result = true;
				let error_keys = {'username' : 'usuário', 'password' : 'senha'};
				for(let field in data_paramters){
					if(!data_paramters[field]){
						error_notify(null,"Falha na operação!","O campo de "+error_keys[field]+' é obrigatório');
						result = false;
					}
				}
				return result;
			};
			this.request('/api/core/authentication/block_session/','post', data_paramters, validation_function, success_function, failure_function);
		},

		unblock_session: function(){
			let scope = this;
			let data_paramters = {};
			data_paramters['password'] = scope.password;

			let success_function = function(response){
				scope.user = response.object;
				scope.errors = response.message;
			};

			let failure_function = function(response){
				error_notify(null,'Senha inválida',"Senha preenchida incorretamente ou não existe")
				scope.form.errors = response.message;

			};

			let validation_function = function () {
				let result = true;
				let error_keys = {'username' : 'usuário', 'password' : 'senha'};
				for(let field in data_paramters){
					if(!data_paramters[field]){
						error_notify(null,"Falha na operação!","O campo de "+error_keys[field]+' é obrigatório');
						result = false;
					}
				}
				return result;
			};
			this.request('/api/core/authentication/unblock_session/','post', data_paramters, validation_function, success_function, failure_function);
		},

		remove_context: function(){
			this.context.local = {}
		},

		handleClick: function(vm, event) {
			console.log(vm, event)
			this.remove_context();
		},
		handleSubmenuShow: function(vm, placement) {
			console.log(vm, placement)
			this.remove_context();
		},
		
		get_user: function () {
			let scope = this;
      let data_paramters = {};
      let success_function = function(response) {
        scope.errors = response.message;
        scope.user = response.object;
        scope.controls.page.loaded = true;
      };

      let failure_function = function(response) {
        window.location.href = "/login";
      };

      this.request('/api/core/authentication/get_user/', 'get', data_paramters, null, success_function, failure_function);
		},

		remove_context: function(){
			//this.context.local = {}
		},

		handleClick: function(vm, event) {
			console.log(vm, event)
			this.remove_context();
		},
		handleSubmenuShow: function(vm, placement) {
			console.log(vm, placement)
			this.remove_context();
		},
	},

	created: function () {
		this.get_user()
	},

	mounted: function () {

	}
});