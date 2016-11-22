$(document).ready(function(){
	$("#user_image").append("<img class=\"ui small centered circular image\" src=\"src/img/cat.jpg\">");
	//request user profile data
	$.ajax({
		url:"/viewprofile",
			type:"POST",
			dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( {"operation":0} ),
            success: function(response) {
				alert(response['username']);
				$("span.Username").text(response['username']);
				$("span.Email").text(response['email']);
				$("span.Birthday").text(response['birthday']);
				$("span.Gender").text(response['gender']);
            }
	});
	$('.ui.dropdown').dropdown();
});
/******************************sign out*************************************/
$("#sign_out").click(function(){
	$.ajax({
		url:"/signout",
		type:"GET",
		success:function(){
			window.location = "index.html";
		}
		
	});
});

/***********************edit profile*******************************/
//username
$("#edit1").click(function(){
	var curName = $("#username_span").text();
	$("#username_span").hide();
	$("#username_edit").show();
	$("#username_edit").val(curName);
	$(this).hide();
	$("#ok1").show();
});

$("#ok1").click(function(){
	var prev = $("#username_span").text();
	var cur = $("#username_edit").val();
	if(cur != prev){
		$.ajax({
		url:"/editname",
			type:"POST",
			dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( {"username":cur} ),
            success: function(response) {
				//alert(response['username']);
				$("#username_span").text(response['username']);
            }
		});
	}
	$("#username_span").show();
	$("#username_edit").hide();
	$("#ok1").hide();
	$("#edit1").show();
});

//birthday
$("#edit2").click(function(){
	var curBirthday = $("#birthday_span").text();
	$("#birthday_span").hide();
	$("#birthday_edit").show();
	$("#birthday_edit").val(curBirthday);
	$(this).hide();
	$("#ok2").show();
});

$("#ok2").click(function(){
	var prev = $("#birthdat_span").text();
	var cur = $("#birthday_edit").val();
	if(cur != prev){
		$.ajax({
		url:"/editbirthday",
			type:"POST",
			dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( {"birthday":cur} ),
            success: function(response) {
				$("#birthday_span").text(response['birthday']);
            }
		});
	}
	$("#birthday_span").show();
	$("#birthday_edit").hide();
	$("#ok2").hide();
	$("#edit2").show();
});
//gender
$("#edit3").click(function(){
	var curGender = $("#gender_span").text();
	$("#gender_span").hide();
	$("#gender_radio").show();
	$(this).hide();
	$("#ok3").show();
	$('.ui.radio.checkbox').checkbox();
});



$("#ok3").click(function(){
	var prev = $("#gender_span").text();
	var cur = $("input[name=gender]:checked").val();
	if(cur != prev){
		$.ajax({
		url:"/editgender",
			type:"POST",
			dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( {"gender":cur} ),
            success: function(response) {
				$("#gender_span").text(response['gender']);
            }
		});
	}
	$("#gender_span").show();
	$("#gender_radio").hide();
	$("#ok3").hide();
	$("#edit3").show();
});