function notify(type,title,description){
	var width = "400px";
  var notice = new PNotify({
  	title: title,
    text: description,
    width: width,
    hide: type!='confirm',
    delay: type=='error' ? 5000 : 5000,
    mouse_reset: false,
    type: type=='confirm' ? 'success' : type,
    addclass: 'clickable',
    styling: 'fontawesome', //fontawesome5 'bootstrap3' // bootstrap3 ,
    nonblock: {
        nonblock: true
    },

    buttons: {
      closer: true,
      sticker: false
    }
  });

  notice.get().click(function() {
		notice.remove();
	});
  return (type!='error');
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
  if(id!=null){document.getElementById(id).focus();}
  return notify("error",title,description);
}

function warning_notify(id,titulo,descricao){
	if(id!=null){document.getElementById(id).focus();}
  return notify("warning",titulo,descricao);
}

function notificar(type,title,text){
	new PNotify({
		title: title,
		addclass: 'visible',
		text: text,
		hide: true,
		delay: 2000,
		mouse_reset: false,
		type: type,
		styling: 'bootstrap4',
	});
}

function marcar_campo_errado(campo){
	$("#"+campo).addClass('wrong_field')
}

function desmarcar_campo_errado(){
	$("#"+campo+" input").removeClass('wrong_field')
}
