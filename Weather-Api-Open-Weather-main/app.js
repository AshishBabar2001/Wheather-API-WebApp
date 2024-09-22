const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (rqe, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function name(req, res) {
  let data = req.body.cityName;

  const cityName = data;
  const apiKey = "946f4fb89106a06649b726eb3d1a58b8";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=" +
    units +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    // console.log(response);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherDescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The wether is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temparature in " +
          cityName +
          " is " +
          temp +
          " degree celsius.</h1>"
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on 3000 Port.");
});
