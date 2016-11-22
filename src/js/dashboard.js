$(document).ready(function(){
	$.ajax({
		url:"/dashboard",
		type:"GET",
		success:function(response){
			var json = JSON.parse(response);
			var name = json['username'];
			//alert(name);
			$("span.Username").text(name);
			$('.ui.dropdown').dropdown();
			setForm(json);
		}
	});
});

function setForm(json){
	//add user image
	$("#user_image").append("<img class=\"ui small centered circular image\" src=\"src/img/cat.jpg\">");
};

$("#view_profile").click(function(){
	window.location = 'view_profile.html';
});