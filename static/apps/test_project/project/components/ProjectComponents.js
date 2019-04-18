Vue.component('app_form_users', {
	mixins: [base_controller],
	props: ['list'],
  data: function () {
    return {
    	object:{
    		first_name: null,
				family_name: null,
				email: null,
				username: null,
				password: '1234abcd'
    	},
    	errors:{
    	}
    }
  },

  methods:{
		save: function(){
			var scope = this;
			var data_paramters = scope.object;

			var success_function = function(response){
				//alert('o que rolou?'+JSON.stringify(response.object));
				//alert("OLHA O QUE EU JA TINHA:"+scope.list);
				scope.errors = response.message;
				success_notify("Operação realizada com sucesso!","");
				scope.list.push(response.object);
				document.getElementById("form_user").reset();
				$('#modal_user').modal('hide');
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			var validate_form = function (){
				var valid_email = validate_email(scope.object.email);
				if (valid_email == false){
					error_notify(null,"Falha na operação","Email inválido.")
					return false;
				}
				return true;
			}

			this.request('/api/user/save','post',data_paramters, validate_form, success_function, failure_function);
		},
  },


  template: `
  <div id='modal_user' class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
			<form id="form_user" v-on:submit.prevent>

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
					<h4 class="modal-title" id="myModalLabel">Novo usuário</h4>
				</div>

				<div class="modal-body">
					<app_field id="first_name" label="Primeiro nome" v-model="object.first_name" :error="errors.first_name" placeholder="" title="Informe o seu primeiro nome.." type="text"></app_field>
					<app_field id="family_name" label="Sobrenome" v-model="object.family_name" :error="errors.family_name" placeholder="" title="Informe o seu sobrenome.." type="text"></app_field>
					<app_field id="email" label="Email" v-model="object.email" :error="errors.email" placeholder="" title="Informe o seu email.." type="text"></app_field>
					<app_field id="username" label="Username" v-model="object.username" :error="errors.username" placeholder="" title="Informe o seu usuário.." type="text"></app_field>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button id="button_send" type="submit" class="btn btn-primary btn-sm submit" v-on:click="save">Salvar</button>
				</div>
			</form>
		</div>
  </div>
  `
})

Vue.component('app_form_project', {
	mixins: [base_controller],
	props: ['list','controls','object'],
  data: function () {
    return {
    	object:{
    		project_key: null,
				project_name: null,
				project_description: null,
				project_language: null,
				project_time_zone: null,
				use_time_zone: null,

				repository_page: null,
				jenkins_page: null,
				sonar_page: null,

				database_engine: null,
				database_name: null,
				database_user: null,
				database_pass: null,
				database_host: null,
				database_port: null,

				backup_remote_plan: null,
				backup_remote_email: null,
				backup_remote_token: null,
				backup_remote_size: null,
				backup_remote_size_max: null,
				backup_remote_size_used: null,
    	},
    	errors:{
    	}
    }
  },

  methods:{
		save: function(){
			var scope = this;
			var data_paramters = scope.object;

			var success_function = function(response){
				if (response.result){
					success_notify("Operação realizada com sucesso!","");
					if(scope.object.id){
						response.object.selected = false;
						scope.object = response.object;
						scope.object.selected = false;
						scope.controls.selected.registers = {};
					}
					else{
						scope.list.push(response.object);
					}
					document.getElementById("form_project").reset();
					$('#modal_project').modal('hide');
				}
				else{
					scope.errors = response.message;
				}
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			var validate_form = function (){
				var valid_email = validate_email(scope.object.backup_remote_email);
				if (valid_email == false){
					error_notify(null,"Falha na operação","E-mail inválido.")
					return false;
				}
				return true;
			}

			this.request('/api/project/save','post',data_paramters, validate_form, success_function, failure_function);
		},
  },

	template: `
		<div id='modal_project' class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<form id="form_project" v-on:submit.prevent>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
							<h4 class="modal-title" id="myModalLabel">Novo Projeto</h4>
						</div>
						<div class="modal-body">
							<div class="tab-content">
								<div id="home" style="padding-left: 15px; padding-right: 15px;">
									<div class="row">
										<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<app_field id="project_name" label="Nome do Projeto" v-model="object.project_name" :error="errors.project_name" placeholder="" title="" type="text"></app_field>
										</div>
									</div>

									<div class="row">
										<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<label><sub>Descrição do Projeto</sub></label>
											<textarea id="project_description" label="Descrição" class='form-control' v-model="object.project_description" :error="errors.project_description" placeholder="" title="Informe o seu sobrenome.." style="width:838px"></textarea>
										</div>
									</div>



									<div class="row">
										<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
											<div class="row">
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<app_field id="repository_page" label="Link do Repositório" v-model="object.repository_page" :error="errors.repository_page" placeholder="" title="" type="text"></app_field>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<app_field id="jenkins_page" label="Link do Jenkins" v-model="object.jenkins_page" :error="errors.jenkins_page" placeholder="" title="" type="text"></app_field>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<app_field id="sonar_page" label="Link do Sonar" v-model="object.sonar_page" :error="errors.sonar_page" placeholder="" title="" type="text"></app_field>
												</div>
											</div>
										</div>

										<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
											<div class="row">
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<label style='font-weight: normal;margin-left:4px;'><sub>Linguagem do Projeto</sub></label>
													<select id="project_language" title="Linguagem do Projeto"  v-model="object.project_language" :error="errors.project_language" class='form-control'>
														<option selected value="PYTHON">Python</option>
														<option value="JAVA">Java</option>
														<option value="JAVASCRIPT">Javascript</option>
														<option value="C">C</option>
														<option value="C#">C#</option>
														<option value="C++">C++</option>
														<option value="RUBY">Ruby</option>
														<option value="PHP">PHP</option>
														<option value="R">R</option>
														<option value="GO">Go</option>
													</select>
												</div>

												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<label style='font-weight: normal;margin-left:4px;'><sub>Fuso Horário</sub></label>
													<select id="project_time_zone" title="Fuso Horário" v-model="object.project_time_zone" :error="errors.project_time_zone" class='form-control'>
														<option value="AMERICA/NORONHA" selected="selected">Ilhas do Atlântico</option>
														<option value="AMERICA/BELEM">Amapá, Pará(Leste)</option>
														<option value="AMERICA/FORTALEZA">MA, PI, CE, RN, PB</option>
														<option value="AMERICA/RECIFE">Pernambuco</option>
														<option value="AMERICA/ARAGUAINA">Tocantins</option>
														<option value="AMERICA/MACEIO">Alagoas, Sergipe</option>
														<option value="AMERICA/BAHIA">Bahia</option>
														<option value="AMERICA/SAO_PAULO">Horário de Brasília</option>
														<option value="AMERICA/CAMPO_GRANDE">Mato Grosso do Sul</option>
														<option value="AMERICA/CUIABA">Mato Grosso</option>
														<option value="AMERICA/PORTO_VELHO">Rondonia, Pará(Oeste)</option>
														<option value="AMERICA/BOA_VISTA">Roraima</option>
														<option value="AMERICA/MANAUS">Amazonas(Leste)</option>
														<option value="AMERICA/EIRUNEPE">Amazonas(Oeste)</option>
														<option value="AMERICA/RIO_BRANCO">Acre</option>
														<option value="EUROPE/LISBON">Lisboa</option>
														<option value="ATLANTIC/AZORES">Açores</option>
														<option value="AFRICA/LUANDA">Angola</option>
														<option value="AFRICA/JOHANNESBURG">Johannesburgo</option>
														<option value="UTC-1">Cabo Verde</option>
														<option value="UCT-0">Guiné-Bissau</option>
														<option value="UTC-8">Macau</option>
														<option value="UTC+2">Moçambique</option>
														<option value="UTC">São Tomé, Príncipe</option>
														<option value="UTC+9">Timor-Leste</option>
														<option value="EUROPE/LONDON">Londres</option>
														<option value="EUROPE/PARIS">Paris</option>
														<option value="EUROPE/ROME">Roma</option>
														<option value="EUROPE/MADRID">Madri</option>
														<option value="EUROPE/BERLIN">Berlim</option>
														<option value="EUROPE/MOSCOW">Moscou</option>
														<option value="AMERICA/NEW_YORK">Nova Iorque</option>
														<option value="AMERICA/CHICAGO">Chicago</option>
														<option value="AMERICA/LOS_ANGELES">Los Angeles</option>
														<option value="AMERICA/MEXICO_CITY">Cidade del México</option>
														<option value="AMERICA/ARGENTINA/BUENOS_AIRES">Buenos Aires</option>
														<option value="AMERICA/SANTIAGO">Santiago</option>
														<option value="AMERICA/BOGOTA">Bogotá</option>
														<option value="ASIA/TOKYO">Tóquio</option>
														<option value="ASIA/SHANGHAI">Shanghai</option>
														<option value="AUSTRALIA/SYDNEY">Sidnei</option>
													</select>
												</div>

												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<label style='font-weight: normal;margin-left:4px;'><sub>Usar o fuso horário</sub></label>
													<select id="use_time_zone" title="Exibir Fuso Horário" v-model="object.use_time_zone" :error="errors.use_time_zone" class='form-control'>
														<option value="True">Sim</option>
														<option value="False" selected>Não</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer" style='padding-top: 5px;padding-right:25px;border: 0px solid #fff;'>
							<button type="button" class="btn btn-sm btn-default" style='width: 120px;' v-on:click='save()'>Salvar</button><!-- data-dismiss="modal"  -->
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
  `
})

Vue.component('app_form_database', {
	mixins: [base_controller],
	props: ['list','controls','object'],
  data: function () {
    return {
    	object:{
				database_engine: null,
				database_name: null,
				database_user: null,
				database_pass: null,
				database_host: null,
				database_port: null,
    	},
    	errors:{
    	}
    }
  },

  methods:{
		save: function(){

			var scope = this;
			var data_paramters = scope.object;
			var success_function = function(response){
				if (response.result){
					success_notify("Operação realizada com sucesso!","");
					if(scope.object.id){
						response.object.selected = false;
						scope.object = response.object;
						scope.object.selected = false;
						scope.controls.selected.registers = {};
					}
					else{
						scope.list.push(response.object);
					}
					document.getElementById("form_project").reset();
					$('#modal_project').modal('hide');
				}
				else{
					scope.errors = response.message;
				}
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			this.request('/api/project/save','post',data_paramters, null, success_function, failure_function);
		},
  },

	template: `
		<div id='modal_database' class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<form id="form_database" v-on:submit.prevent>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
							<h4 class="modal-title" id="myModalLabel">Database do Projeto</h4>
						</div>
						<div id="home" style="padding-left: 15px; padding-right: 15px;">
							<div class="modal-body">
								<sub>Database do Projeto</sub>
									<select id="database_engine" title="Database do Projeto" v-model="object.database_engine" :error="errors.database_engine" class='form-control'>
										<option value="django.db.backends.postgresql_psycopg2" selected>PostgreSQL</option>
									</select>
									<app_field id="database_name" label="Nome da Database" v-model="object.database_name" :error="errors.database_name" placeholder="" title="" type="text"></app_field>
									<div class="row">
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="database_user" label="Usuário da Database" v-model="object.database_user" :error="errors.database_user" placeholder="" title="" type="text"></app_field>
										</div>
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="database_pass" label="Senha da Database" v-model="object.database_pass" :error="errors.database_pass" placeholder="" title="" type="text"></app_field>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="database_host" label="Host da Database" v-model="object.database_host" :error="errors.database_host" placeholder="" title="" type="text"></app_field>
										</div>
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="database_port" label="Porta da Database" v-model="object.database_port" :error="errors.database_port" placeholder="" title="" type="text"></app_field>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer" style='padding-top: 5px;padding-right:25px;border: 0px solid #fff;'>
								<button type="button" class="btn btn-sm btn-default" style='width: 120px;' v-on:click='save()'>Salvar</button><!-- data-dismiss="modal"  -->
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
  `
})

Vue.component('app_form_backup', {
	mixins: [base_controller],
	props: ['list','controls','object'],
  data: function () {
    return {
    	object:{
				backup_remote_plan: null,
				backup_remote_email: null,
				backup_remote_token: null,
				backup_remote_size: null,
				backup_remote_size_max: null,
				backup_remote_size_used: null,
    	},
    	errors:{
    	}
    }
  },

  methods:{
		save: function(){
			var scope = this;
			var data_paramters = scope.object;

			var success_function = function(response){
				if (response.result){
					success_notify("Operação realizada com sucesso!","");
					if(scope.object.id){
						response.object.selected = false;
						scope.object = response.object;
						scope.object.selected = false;
						scope.controls.selected.registers = {};
					}
					else{
						scope.list.push(response.object);
					}
					document.getElementById("form_project").reset();
					$('#modal_project').modal('hide');
				}
				else{
					scope.errors = response.message;
				}
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			this.request('/api/project/save','post',data_paramters, null, success_function, failure_function);
		},
  },

	template: `
		<div id='modal_backup' class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<form id="form_backup" v-on:submit.prevent>
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
							<h4 class="modal-title" id="myModalLabel">Configurar Backup</h4>
						</div>
						<div id="home" style="padding-left: 15px; padding-right: 15px;">
							<div class="modal-body">
								<div class="tab-content">
									<sub>Opções de Backup</sub>
									<select id="backup_remote_plan" title="Opções de Backup" v-model="object.backup_remote_plan" :error="errors.backup_remote_plan" class='form-control'>
										<option value="WEEKLY" selected>Semanal</option>
										<option value="BIWEEKLY" selected>Quinzenal</option>
										<option value="MONTHLY" selected>Mensal</option>
										<option value="SEMESTER" selected>Semestral</option>
										<option value="YEARLY" selected>Anual</option>
									</select>
									<div class="row">
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="backup_remote_email" label="Conta do Backup" v-model="object.backup_remote_email" :error="errors.backup_remote_email" placeholder="" title="Informe um e-mail..." type="text"></app_field>
										</div>
										<div class="col-lg-6 col-md-6 col-sm-6">
											<app_field id="backup_remote_token" label="Chave de Autorização" v-model="object.backup_remote_token" :error="errors.backup_remote_token" placeholder="" title="" type="text"></app_field>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-4 col-md-4 col-sm-4">
											<app_field id="backup_remote_size_max" label="Espaço na Nuvem" v-model="object.backup_remote_size_max" :error="errors.backup_remote_size_max" placeholder="" title="" type="text"></app_field>
										</div>
										<div class="col-lg-4 col-md-4 col-sm-4">
											<app_field id="backup_remote_size" label="Espaço Utilizado" v-model="object.backup_remote_size" :error="errors.backup_remote_size" placeholder="" title="Informe um e-mail..." type="text"></app_field>
										</div>
										<div class="col-lg-4 col-md-4 col-sm-4">
											<app_field id="backup_remote_size_used" label="Percentual Utilizado" v-model="object.backup_remote_size_used" :error="errors.backup_remote_size_used" placeholder="" title="" type="text"></app_field>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer" style='padding-top: 5px;padding-right:25px;border: 0px solid #fff;'>
							<button type="button" class="btn btn-sm btn-default" style='width: 120px;' v-on:click='save()'>Salvar</button><!-- data-dismiss="modal"  -->
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
  `
})