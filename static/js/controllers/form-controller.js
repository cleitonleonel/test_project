var app = new Vue({
  el: '#app',
  data: {
    object: {
      username: '',
      password: '',
    },

    users: [
      {id: 1, username: 'adenild', password: '1q2w3e4r'},
      {id: 2, username: 'joaopsouzar', password: '1q2w3e4r'},
      {id: 3, username: 'diegopasti', password: '1q2w3e4r'}
    ]
  },
  methods: {
    otma_login: function() {
      var data_parameters = this.object;
      alert('olha o data_parameters:'+JSON.stringify(data_parameters));
    },
  },
});