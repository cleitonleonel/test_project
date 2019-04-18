Vue.component('app_form_login', {
	//props: ['id','object','errors', 'submit_action'],
	mixins: [base_controller],
	props: [],
  data: function () {
    return {
    	object:{
    		username: null,
				password: null
    	},
    	errors:{
    	}
    }
  },

  methods:{
		login: function(){
			var scope = this;
			var data_paramters = this.object;
			var success_function = function(response){
				//alert("deu certo:"+JSON.stringify(response));
				scope.errors = response.message;
				window.location.href = "/";
			}

			var failure_function = function(response){
				//alert("deu pau:"+JSON.stringify(response));
				scope.errors = response.message;
			}
			this.request('/api/login/save','post',data_paramters, null, success_function, failure_function);
		}
  },

  template: `
		<form id="form_login" v-on:submit.prevent>
  		<!--<form v-bind:id="id" v-on:submit.prevent>-->
  		<app_field id="username" label="" v-model="object.username" :error="errors.username" placeholder="Usuário.." title="Informe o seu usuário.." type="text"></app_field>
			<br>
			<app_field id="password" label="" v-model="object.password" :error="errors.password" placeholder="Senha.." title="Informe o sua senha.." type="password"></app_field>
			<br>
			<div>
				<button id="button_send" class="section-scroll btn btn-border-w btn-round form-control" v-on:click="login()" type="submit">Entrar</button>
			</div>
		</form>
  `

	/*
  template: `
  	<form v-bind:id="id" v-on:submit.prevent>
  		<app_field id="username" v-model="object.username" :error="errors.username" placeholder="Usuário.." title="Informe o seu usuário.." type="text"></app_field>
			<app_field id="password" v-model="object.password" :error="errors.password" placeholder="Senha.." title="Informe o sua senha.." type="password"></app_field>
			<div>
				<button id="button_send" type="submit" class="btn btn-primary btn-sm submit form-control" v-on:click="submit_action">Entrar</button>
			</div>
		</form>
  	`
  */
})

Vue.component('app_form_register', {
	mixins: [base_controller],
	props: [],
  data: function () {
    return {
    	object:{
    		first_name: null,
				family_name: null,
				email: null,
				username: null,
				password:null,
				confirm_password:null,
    	},

    	errors:{
    	}
    }
  },

  methods:{
		register: function(){
			var scope = this;
			var data_paramters = scope.object;

			var success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/login";
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			var validate_form = function (){
				var valid_email = validate_email(scope.object.email);
				var valid_password = validate_password(scope.object.password,scope.object.confirm_password);
				if (valid_email == false){
					error_notify(null,"Falha na operação","Email inválido.")
					return false;
				}

				if (valid_password == false){
				error_notify(null,"Falha na operação","Senha inválida.")
				return false;
				}

				return valid_email && valid_password;
			}

			this.request('/api/register/save','post',data_paramters, validate_form, success_function, failure_function);
		},
  },

  template: `
		<form id="form_register" v-on:submit.prevent>
			<div class='row'>
				<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
					<app_field id="first_name" label="" v-model="object.first_name" :error="errors.first_name" placeholder="Primeiro nome.." title="Informe o seu primeiro nome.." type="text"></app_field>
				</div>
				<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
					<app_field id="family_name" label="" v-model="object.family_name" :error="errors.family_name" placeholder="Sobrenome.." title="Informe o seu sobrenome.." type="text"></app_field>
				</div>
			</div>
			<br>
			<div class='row'>
				<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
				<app_field id="email" label="" v-model="object.email" :error="errors.email" placeholder="Email.." title="Informe o seu email.." type="text"></app_field>
				</div>
			</div>
			<br>
			<div class='row'>
				<div class='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
					<app_field id="username" label="" v-model="object.username" :error="errors.username" placeholder="Usuário.." title="Informe o seu usuário.." type="text"></app_field>
				</div>

				<div class='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
					<app_field id="password" label="" v-model="object.password" :error="errors.password" placeholder="Senha.." title="Informe o sua senha.." type="password"></app_field>
				</div>

				<div class='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
					<app_field id="confirm_password" label="" v-model="object.confirm_password" :error="errors.confirm_password" placeholder="Confirmar Senha.." title="Repita a Senha.." type="password"></app_field>
				</div>
			</div>
			<hr>
			<div>
				<button id="button_send" type="submit" class="btn btn-primary btn-sm submit form-control" v-on:click="register">Salvar</button>
			</div>
		</form>
  `
})

Vue.component('app_form_reset_password', {
	mixins: [base_controller],
	props: [],
  data: function () {
    return {
    	object:{
				email: null
    	},

    	errors:{
    	}
    }
  },

  methods:{
    reset_password: function(){
			var scope = this;
			var data_paramters = scope.object;
			var success_function = function(response){
				scope.errors = response.message;
			//	window.location.href = "/";
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}

			var validate_form = function (){
				return validate_email(scope.object.email);
			}

			this.request('/api/reset_password/','post',data_paramters, validate_form, success_function, failure_function);
		}
  },

  template: `

		<form id="form_reset_password" v-on:submit.prevent>
			<app_field id="email" label="" v-model="object.email" :error="errors.email" placeholder="E-mail" title="Informe o seu e-mail..." type="text"></app_field>
			<br>
			<div>
				<button id="button_send" type="submit" class="section-scroll btn btn-border-w btn-round form-control" v-on:click="reset_password">Enviar</button>
			</div>
		</form>
  `
})

Vue.component('app-form-profile', {
	mixins: [base_controller],
	props: ['github_key'],
  data: function () {
    return {
    	object:{
    		first_name: 'Cesar Cunha',
		  	family_name: 'da Cunha',
			  email: 'cesarcunha07@gmail.com',
			  username: null,
			  password: null,
			  url : 'https://avatars1.githubusercontent.com/u/',

    	},

    	errors:{
    	}
    }
  },

  methods:{
		register: function(){
			var scope = this;
			var data_paramters = scope.object;

			var validator = function(){
				return true
    	}

			var success_function = function(response){
				scope.errors = response.message;
				window.location.href = "/login";
			}

			var failure_function = function(response){
				scope.errors = response.message;
			}
			this.request('/api/profile/save','post',data_paramters, validator, success_function, failure_function);
		},
  },

  template: `
     <div class="right_col" role="main" style='margin: 2px;'>
			<div class="">
				<div class="clearfix"></div>
					<div class="row">
						<div class="col-md-12 col-sm-12 col-xs-12">
							<div class="x_panel">
								<div class="x_title">
									<h2>Perfil do Usuário</h2>
									<ul class="nav navbar-right panel_toolbox">
										<li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
										</li>
										<li class="dropdown">
											<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
											<ul class="dropdown-menu" role="menu">
												<li><a href="#">Settings 1</a>
												</li>
												<li><a href="#">Settings 2</a>
												</li>
											</ul>
										</li>
										<li><a class="close-link"><i class="fa fa-close"></i></a>
										</li>
									</ul>
									<div class="clearfix"></div>
								</div>
								<div class="x_content">
									<div class="col-md-3 col-sm-3 col-xs-12 profile_left">
										<div class="profile_img">
											<div id="crop-avatar">
												<img class="img-responsive avatar-view" :src="'https://avatars1.githubusercontent.com/u/'+github_key" alt="Avatar" title="Change the avatar"><!-- https://avatars1.githubusercontent.com/u/7139752?v=4 -->
											</div>
										</div>
										<h3> {{ object.first_name }}</h3>
										<ul class="list-unstyled user_data">
											<li><i class="fa fa-map-marker user-profile-icon"></i> Guarapari, Espírito Santo, BR
											</li>

											<li>
												<i class="fa fa-briefcase user-profile-icon"></i> Software Engineer
											</li>

											<li class="m-top-xs">
												<i class="fa fa-external-link user-profile-icon"></i>
												<a href="#" target="_blank">www.otma.com.br</a>
											</li>
										</ul>


										<!-- start skills -->
										<h4>Habilidades</h4>
										<ul class="list-unstyled user_data">
											<li>
												<p>Aplicações Web</p>
												<div class="progress progress_sm">
													<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="50"></div>
												</div>
											</li>
											<li>
												<p>Web Design</p>
												<div class="progress progress_sm">
													<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="70"></div>
												</div>
											</li>
											<li>
												<p>Automação e Teste</p>
												<div class="progress progress_sm">
													<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="30"></div>
												</div>
											</li>
											<li>
												<p>UI / UX</p>
												<div class="progress progress_sm">
													<div class="progress-bar bg-green" role="progressbar" data-transitiongoal="50"></div>
												</div>
											</li>
										</ul>
										<!-- end of skills -->
									</div>

									<div class="col-md-9 col-sm-9 col-xs-12">
										<div class="" role="tabpanel" data-example-id="togglable-tabs">
											<ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
												<li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">Gráfico de Atividades</a>
												</li>
												<li role="presentation" class=""><a href="#tab_content2"  role="tab"  id="profile-tab1"data-toggle="tab" aria-expanded="false">Atividades Recentes</a>
												</li>
												<li role="presentation" class=""><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">Projetos</a>
												</li>
												<li role="presentation" class=""><a href="#tab_content4" role="tab" id="profile-tab3" data-toggle="tab" aria-expanded="false">Dados da Conta</a>
												</li>
											</ul>
											<div class="x_panel" style='margin-top: -15px;'>
												<div id="myTabContent" class="tab-content">
													<div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
													 <!--<div class="profile_title">
														 <div class="col-md-6">
															 <h2>Gráfico de Atividades do Usuário</h2>
														 </div>
													 </div>-->
													 <div class='x_content'>
														 <div class="col-md-6">
															 <!--<div id="reportrange" class="pull-right" style="margin-top: 5px; background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #E6E9ED">
																 <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
																 <span></span> <b class="caret"></b>
															 </div>-->
															 <!--<div class="x_content">-->
															 <canvas id="radar-chart" width="200" height="200"></canvas>
														 </div>
														 <div class='col-md-6' style='text-align: center;'>
															<b>Experiência</b>
														 </div>
													 </div>
													 <!-- start of user-activity-graph -->
													 <div id="graph_bar" style="width:100%; height:280px;"></div>
													 <!-- end of user-activity-graph -->
													</div>

													<div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab1">
														<!-- start recent activity -->
														<ul class="messages">
															<li>
																<img src="images/img.jpg" class="avatar" alt="Avatar">
																<div class="message_date">
																	<h3 class="date text-info">24</h3>
																	<p class="month">May</p>
																</div>
																<div class="message_wrapper">
																	<h4 class="heading">Desmond Davison</h4>
																	<blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
																	<br />
																	<p class="url">
																		<span class="fs1 text-info" aria-hidden="true" data-icon=""></span>
																		<a href="#"><i class="fa fa-paperclip"></i> User Acceptance Test.doc </a>
																	</p>
																</div>
															</li>
															<li>
																<img src="images/img.jpg" class="avatar" alt="Avatar">
																<div class="message_date">
																	<h3 class="date text-error">21</h3>
																	<p class="month">May</p>
																</div>
																<div class="message_wrapper">
																	<h4 class="heading">Brian Michaels</h4>
																	<blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
																	<br />
																	<p class="url">
																		<span class="fs1" aria-hidden="true" data-icon=""></span>
																		<a href="#" data-original-title="">Download</a>
																	</p>
																</div>
															</li>
															<li>
																<img src="images/img.jpg" class="avatar" alt="Avatar">
																<div class="message_date">
																	<h3 class="date text-info">24</h3>
																	<p class="month">May</p>
																</div>
																<div class="message_wrapper">
																	<h4 class="heading">Desmond Davison</h4>
																	<blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
																	<br />
																	<p class="url">
																		<span class="fs1 text-info" aria-hidden="true" data-icon=""></span>
																		<a href="#"><i class="fa fa-paperclip"></i> User Acceptance Test.doc </a>
																	</p>
																</div>
															</li>
															<li>
																<img src="images/img.jpg" class="avatar" alt="Avatar">
																<div class="message_date">
																	<h3 class="date text-error">21</h3>
																	<p class="month">May</p>
																</div>
																<div class="message_wrapper">
																	<h4 class="heading">Brian Michaels</h4>
																	<blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
																	<br />
																	<p class="url">
																		<span class="fs1" aria-hidden="true" data-icon=""></span>
																		<a href="#" data-original-title="">Download</a>
																	</p>
																</div>
															</li>
														</ul>
														<!-- end recent activity -->
													</div>

													<div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab2">
														<!-- start user projects -->
														<table class="data table table-striped no-margin">
															<thead>
																<tr>
																	<th>#</th>
																	<th>Project Name</th>
																	<th>Client Company</th>
																	<th class="hidden-phone">Hours Spent</th>
																	<th>Contribution</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>1</td>
																	<td>New Company Takeover Review</td>
																	<td>Deveint Inc</td>
																	<td class="hidden-phone">18</td>
																	<td class="vertical-align-mid">
																		<div class="progress">
																			<div class="progress-bar progress-bar-success" data-transitiongoal="35"></div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>2</td>
																	<td>New Partner Contracts Consultanci</td>
																	<td>Deveint Inc</td>
																	<td class="hidden-phone">13</td>
																	<td class="vertical-align-mid">
																		<div class="progress">
																			<div class="progress-bar progress-bar-danger" data-transitiongoal="15"></div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>3</td>
																	<td>Partners and Inverstors report</td>
																	<td>Deveint Inc</td>
																	<td class="hidden-phone">30</td>
																	<td class="vertical-align-mid">
																		<div class="progress">
																			<div class="progress-bar progress-bar-success" data-transitiongoal="45"></div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>4</td>
																	<td>New Company Takeover Review</td>
																	<td>Deveint Inc</td>
																	<td class="hidden-phone">28</td>
																	<td class="vertical-align-mid">
																		<div class="progress">
																			<div class="progress-bar progress-bar-success" data-transitiongoal="75"></div>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
														<!-- end user projects -->
													</div>

													<div role="tabpanel" class="tab-pane fade" id="tab_content4" aria-labelledby="profile-tab3">
														<form  v-on:submit.prevent class="col-md-12 col-sm-12 col-xs-12">
															 <div class="col-md-6">
																	<h2>Dados Pessoais</h2>
															 <app_field id="first_name" v-model="object.first_name" :error="errors.first_name" placeholder="Primeiro Nome.." title="Informe o seu nome.." type="text"></app_field>

															 <app_field id="family_name" v-model="object.family_name" :error="errors.family_name" placeholder="Sobrenome.." title="Informe o seu sobrenome.." type="text"></app_field>
																	<app_field id="email" v-model="object.email" :error="errors.email" placeholder="Seu e-mail.." title="Informe o seu e-mail.." type="text"></app_field>
																	<br>
																	<button id="button_send" type="submit" class="btn btn-primary btn-sm submit form-control" v-on:click="register">Salvar</button>
															 </div>
															 <div class="col-md-6">
																<h2>Dados de Acesso</h2>
																<app_field id="username" v-model="object.username" :error="errors.username" placeholder="Usuário.." title="Informe o seu login.." type="text"></app_field>
																<app_field id="password" v-model="object.password" :error="errors.password" placeholder="Nova senha.." title="Informe a nova senha.." type="password"></app_field>
																<app_field id="password" v-model="object.password" :error="errors.password" placeholder="Confirme sua senha.." title="Confirme sua senha.." type="password"></app_field>
																<br>
																<button id="button_send" type="submit" class="btn btn-primary btn-sm submit form-control" v-on:click="register">Salvar</button>
															 </div>
														</form>
													</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /page content -->
  	`
})