var new_app = new Vue('app',{
  el: '#entities_app',
  mixins: [base_controller],
  data: function() {
    return {
			forms: {
				entity:{
					options: {
						type: {
							PF: {
								label: 'Pessoa Física',
								value: 'PF'
							},
							PJ: {
								label: 'Pessoa Jurídica',
								value: 'PJ'
							}
						},
						company_relation:{
							Fu: {
								label: 'Funcionário',
								value: 'FUNCIONARIO'
							},
							Fo: {
								label: 'Fornecedor',
								value: 'FORNECEDOR'
							},
							Cl: {
								label: 'Cliente',
								value: 'CLIENTE'
							},
							Ba: {
								label: 'Banco',
								value: 'BANCO'
							},
							Tr: {
								label: 'Trasnportador',
								value: 'TRANSPORTADOR'
							},
							Re: {
								label: 'Representante',
								value: 'REPRESENTANTE'
							}
						},
						activities: {
							Co: {
								label: 'Comércio',
								value: 'COMERCIO'
							},
							Se: {
								label: 'Serviço',
								value: 'SERVICO'
							},
							In: {
								label: 'Indústria',
								value: 'INDUSTRIA'
							},
							Im: {
								label: 'Importador',
								value: 'IMPORTADOR'
							},
							Exp: {
								label: 'Exportador',
								value: 'EXPORTADOR'
							},
							PR: {
								label: 'Produtor Rural',
								value: 'PRODUTOR_RURAL'
							},
							Ext: {
								label: 'Extravista',
								value: 'EXTRAVISTA',
							}
						},
						status: {
							Hab: {
								label: 'Habilitado',
								value: 'HAB'
							},
							Ina: {
								label: 'Inativo',
								value: 'INA'
							},
							Sus: {
								label: 'Suspenso',
								value: 'SUS'
							},
							Blo: {
								label: 'Bloqueado',
								value: 'BLO'
							},
							Des: {
								label: 'Desabilitado',
								value: 'DES'
							},
						}
					},

					object:{
						type: null,
						official_doc: null,
						name: null,
						popular_name: null,
						nationality: null,
						company_relation: [],
						activities: [],
						status: null,
						comments: null
					},

					errors:{},

					selected:{
						index: null,
						register: null
					},
				},
			},

			entities: {
        data: [],
        dict: {},
        loaded: false,
        errors: [],
      },
		}
	},
	methods: {
		load_entities: function() {
      let scope = this;
      let data_paramters = {};
      let success_function = function(response) {
        //scope.errors = response.message;
        scope.entities.data = response.object;
        alert("ok"+JSON.stringify(scope.entities.data))
      };

      let failure_function = function(response) {
        //scope.errors = response.message;
        //scope.entities.loaded = null;
        alert("erro")
      };

      this.request('/api/entities/load/', 'get', data_paramters, null, success_function, failure_function);
    },
	},

	mounted: function() {
    this.load_entities();
	},
});