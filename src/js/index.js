$("#homepage_btn").click(function(){
	$.ajax({
			url:"/signup",
			type:"GET",
			success:function(response){
				if(response == 'Err'){
					alert('You have already signed in !');
				}else{
					window.location='/signup.html';
				}
			}
		});
});
