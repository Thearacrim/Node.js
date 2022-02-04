const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { request } = require("http");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

const url = "https://<dc>.api.mailchimp.com/3.0/0f2e6f2ded ";
app.post("/", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/0f2e6f2ded";
  const options = {
    method: "POST",
    auth: "Theara:bf21403289aa13939e5a78da4abd65df-us14",
  };
  const request = https.request(url, options, (respone) => {
    if (respone.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    respone.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  // request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("listening on port 3000");
});

//api key bf21403289aa13939e5a78da4abd65df-us14

//id list 0f2e6f2ded
