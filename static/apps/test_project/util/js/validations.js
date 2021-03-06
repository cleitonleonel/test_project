function validate_email(email){
	if (email != '' && email != null){
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test(email);
	}
	return true;
}

function validate_password(password, confirm_password){
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