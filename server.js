var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));


// Set up to use a session
app.use(session({ secret: 'Foodie', resave: false, saveUninitialized: false }));


app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

app.get('/',function(req, res) {
    res.render('index.html');
});

/******************go to signup page******************/
app.get('/signup',function(req, res) {
    //check if the user already sign in
	if(req.session.email !== undefined) {
    res.redirect('/');
    res.send('Err');
  }

  res.render('signup.html');

});

/***********************get sign up form**********************/
app.post('/signup',function(req,res){
	console.log(req.body);
	var Users = JSON.parse(fs.readFileSync('user.json','utf8'));
	var email = req.body.email;
	var dup = false;
	//check duplication
	for(var i = 0; i < Users.users.length;i++){
		if(Users.users[i].email == email){
			dup = true;
			break;
		}
	}
	if(dup){
		return res.json({
            state: "Err"
        });
	}else{
		req.session.email = req.body.email;
		req.session.username = req.body.username;
		Users.users.push(req.body);
		var json = JSON.stringify(Users,null,2);
		fs.writeFile('user.json',json);
		return res.json({
            state: "Success"
        });
	}

});
/*****************************log in page****************************/
app.post('/login', function(req, res){
  console.log(req.body);
});

/********************go to user main page****************************/
app.get('/mainpage',function(req,res){
	console.log(req.session.email);
	var em = req.session.email;
	var Users = JSON.parse(fs.readFileSync('user.json','utf8'));
	var us = null;
	for(var i = 0; i < Users.users.length; i++){
		if(Users.users[i].email == em){
			us = Users.users[i];
			break;
		}
	}
	//console.log(us);
	//TODO log in again
	res.send(JSON.stringify(us));
});

/********************************go to user dashboard*********************************/
app.get('/dashboard',function(req,res){
	console.log(req.session.email);
	var em = req.session.email;
	var Users = JSON.parse(fs.readFileSync('user.json','utf8'));
	var us = null;
	for(var i = 0; i < Users.users.length; i++){
		if(Users.users[i].email == em){
			us = Users.users[i];
			break;
		}
	}
	//console.log(us);
	res.send(JSON.stringify(us));
});

/**********************************view User profile*************************************/
app.post('/viewprofile',function(req,res){
	console.log(req.session.email);
	var em = req.session.email;
	var Users = JSON.parse(fs.readFileSync('user.json','utf8'));
	if(req.body.operation == 0){//get profile
		var us = null;
		for(var i = 0; i < Users.users.length; i++){
			if(Users.users[i].email == em){
				us = Users.users[i];
				break;
			}
		}
		//console.log(us);
		return res.json(us);
	}

});

/********************************change username*************************************/
app.post('/editname',function(req,res){
	console.log(req.body.username);
	var em = req.session.email;
	var Users = JSON.parse(fs.readFileSync('user.json','utf8'));
	var us = null;
	for(var i = 0; i < Users.users.length; i++){
		if(Users.users[i].email == em){
			us = i;
			break;
		}
	}
	Users.users[us].username = req.body.username;
	//save back to file
	fs.writeFile('user.json',JSON.stringify(Users,null,2));
	return res.json({username:Users.users[us].username});
});
/************************************change birthday********************************************/
app.post('/editbirthday',function(req,res){
	console.log(req.body.birthday);
	var em = req.session.email;
	var Users = JSON.parse(fs.readFileSync('user.json','utf8'));
	var us = null;
	for(var i = 0; i < Users.users.length; i++){
		if(Users.users[i].email == em){
			us = i;
			break;
		}
	}
	Users.users[us].birthday = req.body.birthday;
	//save back to file
	fs.writeFile('user.json',JSON.stringify(Users,null,2));
	return res.json({birthday:Users.users[us].birthday});
});
/******************************************change gender*******************************************/
app.post('/editgender',function(req,res){
	console.log(req.body.gender);
	var em = req.session.email;
	var Users = JSON.parse(fs.readFileSync('user.json','utf8'));
	var us = null;
	for(var i = 0; i < Users.users.length; i++){
		if(Users.users[i].email == em){
			us = i;
			break;
		}
	}
	Users.users[us].gender = req.body.gender;
	//save back to file
	fs.writeFile('user.json',JSON.stringify(Users,null,2));
	return res.json({gender:Users.users[us].gender});
});
/***************************sign out********************************************/
app.get('/signout',function(req,res){
	req.session.destroy();
	res.redirect('/');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
