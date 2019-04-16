var app = new Vue({
  el: '#app',
  mixins: [base_controller],
  data: function() {
    return {
      password: null,
      controls: {
        session_blocked: false,
        unlock_key: '123'
      }
    }
	},

	methods: {
		block_session: function (){
			this.controls.session_blocked = true;
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