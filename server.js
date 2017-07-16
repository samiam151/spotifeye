const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const compression = require("compression");
const musicFolder = "C:/Users/samia/Music/New Music/";

// Middleware
app.use(compression());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static("public"));

// Routing
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
    let url = req.body.url;
    // res.set({"Content-Type": "audio/mpeg"});
    res.set({"Content-Type": "application/octet-stream"});
    
    console.log("--- Creating audio stream...");
    let readStream = fs.createReadStream(url);
    
    readStream.on("open", function(){
    // readStream.on("data", function(chunk){
        console.log("--- Sending audio stream...");
        readStream.pipe(res);
        // chunk.pipe(res);
    });
    readStream.on("error", (err) => {
        res.end(err);
    });
    readStream.on("close", () => {
        console.log("--- Stream closed...");
    });
});

// Start server
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Welcome to Spotifeye!");
    console.log(`Now playing on port ${port}...`);
    console.log("");
});
