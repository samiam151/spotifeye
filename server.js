const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const musicFolder = "C:/Users/samia/Music/New Music/";

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + "/index.html");
});

app.get("/data", (req, res) => {
    res.sendFile(__dirname + "/data/songsPersonal.json");
});

app.post("/song", (req, res) => {
    let url = req.body.url;
    // res.sendFile(url);
    res.set({"Content-Type": "audio/mpeg"});
    var readStream = fs.createReadStream(url);
    readStream.pipe(res);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
