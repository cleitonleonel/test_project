var app = new Vue({
  el: '#app_core_authentication',
  mixins: [base_controller],
  data: function() {
    return {
      pages: {
        active: "login",
      },

			forms: {
				login:{
					object:{
						username:null,
						password:null
					},
					errors:{},
					selected:{
						index: null,
						register: null
					},
				},

				signup:{
					object:{
						first_name: null,
						family_name: null,
						email: null,

						activation_code: null,
						username:null,
						password:null
					},
					errors:{},
					selected:{
						index: null,
						register: null
					},
				},

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

				reset_password:{
					object:{
						email: null,
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
		change_page: function (page){
			this.pages.active = page;
		}
	}
});