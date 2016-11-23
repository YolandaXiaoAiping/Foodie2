$("#signup_submit").click(function(){
	var username = $("#username").val();
	var email = $("#email").val();
	var password1 = $("#password-1").val();
	var password2 = $("#password-2").val();
	var birthday = $("#birthday").val();
	var gender = $("input:radio[name=gender]:checked").val();
	//alert(username+","+email+","+password1+","+password2+","+birthday+","+gender);
	if(!username || !password1 || !password2 || !birthday){
		$("#email_duplicated").hide();
		$("#password_not_same").hide();
		$("#form_not_finished").show();
	}else if(password1 != password2){
		$("#email_duplicated").hide();
		$("#password_not_same").show();
		$("#form_not_finished").hide();
	}else{
		$("#email_duplicated").hide();
		$("#password_not_same").hide();
		$("#form_not_finished").hide();
		//post form and check email duplication
		var fm = {
			username:username,
			email:email,
			password:password1,
			birthday:birthday,
			gender:gender
		};
		//alert(fm.email);
		$.ajax({
			url:"/signup",
			type:"POST",
			dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify( fm ),
      success: function(response) {
				if(response['state'] == 'Success'){
					window.location = '/mainpage.html';
				}else{
					$("#email_duplicated").show();
					$("#password_not_same").hide();
					$("#form_not_finished").hide();
				}
    	}
		});
	}
});

/*********************************log in with facebook**************************************/

$("#facebook").click(function(){
	//TODO
});
