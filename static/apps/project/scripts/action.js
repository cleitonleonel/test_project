function register_action(){
  var page_url = window.location.host + "/" + window.location.pathname + window.location.search
  page_url = page_url.replace("//","/")
  api_url = "/api/otmasolucoes/melinux/management/actions/register/frontend";
  page_url = window.location.protocol+"//"+page_url
  $.ajax({
    type: "get",
    url: api_url,
    data: {
      page: page_url,
    },
    success: function(data){
      try{
        var response = JSON.parse(data);
      }
      catch (err){
        var response = data;
      }
      if (response.result == true){
        var message = "Interação com o projeto registrada com sucesso."
        var data = response.object.creation_date.split("-");
        var task = null;

        data = data[2]+"/"+data[1]+"/"+data[0];
        if (response.object.task != null){
          task = response.object.task;
        }
        message = message +"<br><sub>Data: "+data+" às "+response.object.creation_hour.split(".")[0]+" - Tipo: "+response.object.type[0]+response.object.type.slice(1).toLowerCase()+" - Tarefa: "+task+"</sub>"
        message = message+"<br><sub>Página: "+response.object.request_page+"</sub>"
        return success_notify("Operação realizada com sucesso", message);
      }
      else{
        return error_notify(null, "Falha na operação!", "Atividade não pode ser registrada, contate o administrador.");
      }
    },
    failure: function(data){
      return error_notify(null, "Falha na operação!", "Serviço indisponível, contate o administrador.");
    }
  });
}