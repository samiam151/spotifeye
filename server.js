const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const musicFolder = "C:/Users/samia/Music/New Music/";

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));

app.get('/', (req, res) => {
    console.log("Fetching page...");
    res.sendFile(__dirname + "/index.html");
});

app.get("/data", (req, res) => {
    console.log("Sending song data...");
    res.sendFile(__dirname + "/data/songsPersonal.json");
});

app.post("/song", (req, res) => {
    console.log("Sending song stream...");
    let url = req.body.url;
    res.set({"Content-Type": "audio/mpeg"});
    var readStream = fs.createReadStream(url);
    readStream.on("open", function(){
        readStream.pipe(res);
    });
    readStream.on("error", (err) => {
        res.end(err);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Welcome to Spotifeye!");
    console.log(`Now playing on  port ${port}...`);
});
