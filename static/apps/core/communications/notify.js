function notify(type,title,description){
	var width = ""
	if(type == "success"){
		width = '400px'
	}
	else if(type == "confirm"){
		width = '400px'
	}
	else{
		width = '400px'
	}

  new PNotify({
    title: title,
    text: description,
    width: width,
    hide: type=='confirm' ? false : true,
    delay: type=='error' ? 5000 : 4000,
    mouse_reset: false,
    type: type=='confirm' ? 'success' : type,
    styling: 'bootstrap3' // bootstrap3 , fontawesome
  }
  );
  return (type=='error' ? false : true);
}

function confirm_notify(title,description){
  return notify("confirm",title,description);
}

function info_notify(title,description){
  return notify("info",title,description);
}

function success_notify(title,description){
  return notify("success",title,description);
}

function error_notify(id,title,description){
  document.getElementById(id).focus();
  return notify("error",title,description);
}

function warning_notify(id,titulo,descricao){
  document.getElementById(id).focus();
  return notify("warning",titulo,descricao);
}