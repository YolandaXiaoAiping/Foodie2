$("#log_in").click(function(){
  var username = $("#userName").val();
  var password = $("#pwd").val();
  alert(username + " " + password);
  var user_info = {
    username: username,
    password: password
  }
  $.ajax({
    url:"/login",
    type:"POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(user_info),
    success: function(response){
      
    }
  });
});
