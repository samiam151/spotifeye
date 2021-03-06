const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const compression = require("compression");
const musicFolder = "C:/Users/samia/Music/New Music/";
const homePage = __dirname + "/index.html";
const dataFile = __dirname + "/data/songsPersonal.json";
const crypto = require("crypto");

// Middleware
app.use(compression({
    level: 8
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static("public"));

// Routing
app.get('/', (req, res) => {
    console.log("Fetching page...");
    res.sendFile(homePage);
});

app.get("/data", (req, res) => {
    console.log("Sending song data...");
    res.sendFile(dataFile);
});

app.get("/song", (req, res) => {
    console.log("Heard song stream request...");
    console.log("Decrypting URL...");
    let url = decrypt(req.query.hash);
    console.log(url);

    res.set({"Content-Type": "application/octet-stream"});
    
    console.log("--- Creating audio stream...");
    let readStream = fs.createReadStream(url);
    
    readStream.on("open", function(){
        console.log("--- Sending audio stream...");
        readStream.pipe(res)
    });
    readStream.on("error", (err) => {
        res.end(err);
    });
    readStream.on("close", () => {
        console.log("--- Stream closed...");
    });
});

// Start server
var port = process.env.PORT || 5100;
app.listen(port, function() {
    console.log("Welcome to Spotifeye!");
    console.log(`Playing on port ${port}...`);
    console.log("");
});

function decrypt(hash){
  var decipher = crypto.createDecipher("aes-256-ctr", "test")
  var dec = decipher.update(hash,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}