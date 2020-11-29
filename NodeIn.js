
var url = require('url');
var fs= require('fs');
var express =require('express');
var app = express();
var bodyParser = require('body-parser');
const  usersSignup =[];
var nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended : true }));

//make sure i can use the css files, and js files, with the static folder i created
app.use(express.static(__dirname+ '/public'));

app.get('/log-in',function(req,res){
res.sendFile(__dirname+"/LogIn.html",);

});

app.get('/Contact-Us',function(req,res){
  res.sendFile(__dirname+"/Contact.html",);
})

app.get('/SignUp',function(req,res){
  res.sendFile(__dirname +"/SignUpPage.html",);

}

)

//post for log-in, check if the mail and pass is admin if so will return Admin.
app.post("/log-in",function(req,res){
  
  
  var email= req.body.Email1;
  var password1= req.body.Password1;
  console.log(email+password1);
  
  if(email=="admin"&&password1=="admin"){
    res.send("ADMIN");
  }

  else{
    res.send("DATA");
    
  }
  
})


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ilan19555@gmail.com',
    pass: 'xntjirppktwdesrl'
  }
});




//check if the email already in the "DB" if so, will return error,
// if not, will return to the user a confirmation massege and send confirmation massage to email.
app.post('/SignUp',function(req,res){
  var emailTmp =req.body.Email;
  var passwordTmp=req.body.Password;
  var st= [
    "Your user has been created! Welcome! a confirmation massege was sent to you by mail",
    "Sorry but this email already in use, please try another email"];
  var flag=0;

  for (let [key, value] of Object.entries(usersSignup)) {
   if(value.email==emailTmp)
   flag++;
   break;
}
console.log(flag);
usersSignup.push({
  "email": emailTmp,
  "password": passwordTmp
});

  if(flag==0){
  var mailOptions = {
    from: 'ilan19555@gmail.com',
    to: emailTmp,
    subject: 'Welcome to My site',
    text: 'You have successfuly signed up! Welcome and enjoy'
  };
  
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  }
  res.send(st[flag]);
  


  
  
 
})

app.post('/contact-us',function(req,res){
  var name = req.body.name;
  var email1=req.body.email;
  var select= req.body.selected;
  var tx= req.body.tex;

  var mailOptions = {
    from: 'ilan19555@gmail.com',
    to: 'ilan19555@gmail.com',
    subject: select,
    text: "The name of the user: "+name+"\n"+"The text is: "+tx+"\n Send from: " +email1
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  console.log(tx);
})

app.get('/getAllData',function(req,res){
//Adding Json file data:

var data = {
  id: 1,
  name: 'John Smith',
  hometown: 'myHomeTown',
  occupation: 'myOccupation'

};
var data2 = {
id: 2,
name: 'John Smith 2',
hometown: 'myHomeTown 2',
occupation: 'myOccupation 2'

};

var o ={}
var key = 'Data';
o[key] = [];
o[key].push(data);
o[key].push(data2);
res.send(JSON.stringify(o));
})

app.get('/',function(req,res){
  res.redirect('/SignUp');
})
app.listen(8080);
