var app = new Vue({
  el: '#app',
  mixins: [base_controller],
  data: function() {
    return {
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

      password: null,
      controls: {
        session:{
          timeout_warning:10000,
					timeout_close:15000,
					warning_timer: null,
					closer_timer: null,
        },
        session_activity: true,
        session_blocked: false,
				clock: true,
        unlock_key: '123'
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

		toggle_clock: function() {
			this.controls.clock = !this.controls.clock
		},

		reset_timers: function(){
			let scope = this;
			if(this.controls.session_blocked==false){
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
			this.controls.session_blocked = true;
			clearTimeout(this.controls.session.timeout_warning);
			clearTimeout(this.controls.session.timeout_close);
		},

		unblock_session: function (pass){
			if(pass==this.controls.unlock_key){
				this.controls.session_blocked = false;
			}
			else{
				alert("ta tentando futucar conta dos outros ne pilantra kk")
			}
		}


	}
});