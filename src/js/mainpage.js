$(document).ready(function(){
	$.ajax({
		url:"/mainpage",
		type:"GET",
		success:function(response){
			var json = JSON.parse(response);
			var name = json['username'];
			//alert(name);
			$("#Username").text(name);
			$('.ui.dropdown').dropdown();

		}
	});
});

$("#mainpage_home").click(function(){
	
});

$("#dashboard").click(function(){
	window.location='/dashboard.html';
});