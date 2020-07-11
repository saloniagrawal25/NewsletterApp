const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv');
var app = express();
dotenv.config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/components/signup.html");
})
app.post("/", function (req, res) {
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
    url: "https://" + process.env.API_URL,
    method: "POST",
    headers: {
      "Authorization": "saloni " + process.env.AUTHORIZATION_KEY
    },
    body: jsonData
  }
  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/src/components/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/src/components/success.html");
      } else {
        res.sendFile(__dirname + "/src/components/failure.html");
      }
    }
  })
})
app.post("/failure", function (req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("App is listening at port 3000")
})