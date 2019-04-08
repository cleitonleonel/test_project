var app = new Vue({
  el: '#app',
  data: {
    object: {username: '', password: ''},

    users: [
      {id: 1, email: 'adenildojunior52@gmail.com', username: 'adenild', password: '123adenildo'},
      {id: 2, email: 'joaopsouzar@gmail.com', username: 'joaopsouzar', password: '123joao'},
      {id: 3, email: 'diegopasti@gmail.com', username: 'diegopasti', password: '123diego'}
    ]
  },

  methods: {
    otma_login: function() {
      var data_parameters = this.object;
      var check;
      alert('olha o data:'+JSON.stringify(data_parameters))
      for (check in this.users){
        if (data_parameters in this.users[check]) {
          alert('O usuário existe')
        }
        alert(JSON.stringify(this.users[check]));
      }
    },

    otma_signin: function() {
      alert("aae");
      var data_parameters = this.object;
      var users = this.users;
    },
  },

  mounted: function(){
    alert("cheguei?")
  },
});