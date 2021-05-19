const express = require("express");
const app = express();
const path = require("path");
const request = require("request");

app.use(express.static(__dirname + "/dist/med-tutorials-app"));

app.listen(process.env.PORT || 4200);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/med-tutorials-app/index.html"));
});

const wakeUpServerInterval = setInterval(wakeUpServer, 25 * 60 * 1000);

function wakeUpServer() {
	const now = new Date();
	var endHour = new Date();
	endHour.setHours(23,30,0);

	if(now < endHour ){
    request(
      "https://tuto-share.herokuapp.com/",
      function(err, body) {
        if (err) {
          console.log("Can't call server!");
        } else {
          console.log("Server is awake.");
        }
      }
    );
	} else {
    clearInterval(wakeUpServerInterval);
  }
}

const wakeUpRestApiInterval = setInterval(wakeUpRestApi, 25 * 60 * 1000);

function wakeUpRestApi() {
	const now = new Date();

	var endHour = new Date();
	endHour.setHours(23,30,0);
	if(now < endHour ){
    request(
      "https://med-tutorials-rest-api.herokuapp.com/api/wake-up-server/",
      function(err, body) {
        if (err) {
          console.log("Can't call Rest API!");
        } else {
          console.log("Rest API is awake.");
        }
      }
    );
	} else {
    clearInterval(wakeUpRestApiInterval);
  }
}

console.log("App is listenning!");
