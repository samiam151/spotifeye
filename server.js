const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const compression = require("compression");

const musicFolder = "C:/Users/samia/Music/New Music/";

app.use(compression());
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
    console.log("Heard song stream request...");
    console.log("\tGetting url...");
    let url = req.body.url;
    res.set({"Content-Type": "audio/mpeg"});
    
    console.log("\tCreating audio stream...");
    let readStream = fs.createReadStream(url);
    readStream.on("open", function(){
        console.log("\tSending audio stream...");
        readStream.pipe(res);
    });
    readStream.on("error", (err) => {
        res.end(err);
    });
    readStream.on("close", () => {
        console.log("\tStream closed...")
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Welcome to Spotifeye!");
    console.log(`Now playing on  port ${port}...`);
    console.log("");
});
