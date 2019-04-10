function validate_UpperCase(str) {
  if (str != '') {
    var upperReg = /^[^a-z]*$/;
    return upperReg.test();
  }
  return true;
}

function validate_not_null(name) {
  if (name != '' && name != null) {
    return true;
  }
  return false;
}

function validate_password(password){
  if (password != '' && password != null){
    var pwdReg = /^(?=[a-z_\d]*[a-z])[a-z_\d]{8,}$/;
    return pwdReg.test(password);
  }
  return true;
}

function validate_email(email){
  if (email != '' && email != null){
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test(email);
  }
  return true;
}

function validate_confirm_password(password, confirm_password){
  return password == confirm_password;
}

function validate_git_repository(url){
  var regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
  return regex.test(url);
}

function validate_jenkins_url(url){
  var regex = /(?:jenkins|ssh|https?|jenkins@[-\w.]+):(\/\/)?(.*?)(\/?|\#[-\d\w._]+?)$/;
  return regex.test(url);
}

function validate_sonar_url(url){
  var regex = /(?:sonarqube|ssh|https?|sonarqube@[-\w.]+):(\/\/)?(.*?)(\/?|\#[-\d\w._]+?)$/;
  return regex.test(url);
}