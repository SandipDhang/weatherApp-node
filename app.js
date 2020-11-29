var express = require("express");
var app = express();
var port = process.env.port || 8080;
var request = require("request");

var APIURL =
  "https://api.openweathermap.org/data/2.5/onecall?lat=23.03&lon=72.62&exclude=minutely,hourly&units=metric&appid=b38f9d72787e7b12b09f40840752c032";

app.use(express.static(__dirname + "/public"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  request(APIURL, function (err, response, body) {
    if (err) {
      res.status(404).send("Error while Fetching the Details");
    } else {
      var output = JSON.parse(body);
      res.render("weatherView", {
        weatherData: output,
        feels_like: Math.floor(output.current.feels_like),
      });
    }
  });
});

app.listen(port, function () {
  console.log("Server is running on PORT " + port);
});
