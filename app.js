const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req, res) {
  var fName = req.body.firstName;
  var lName = req.body.lastName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }
    }]
  }
  var jsonData = JSON.stringify(data);
  var options = {
    url: 'https://us4.api.mailchimp.com/3.0/lists/b6dd44a2f9',
    method: "POST",
    headers: {
      "Authorization": "saloni 068c83efc54d058540bbe7181ab8ff8c-us4"
    },
    body: jsonData
  }
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  })
})
app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen( process.env.PORT || 3000, function() {
  console.log("App is listening at port 3000")
})


//068c83efc54d058540bbe7181ab8ff8c-us4

//b6dd44a2f9
