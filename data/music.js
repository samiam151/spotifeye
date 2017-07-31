const fs = require("fs");
const path = require("path");
const walk = require("walk");
const audoMetaData = require("audio-metadata");
const id3 = require("id3js");
const crypto = require("crypto");

let baseFolder = process.argv[2];
console.log(baseFolder);

const musicBaseFolder = baseFolder ? baseFolder : "C:/Users/samia/Music";
let options = {
    followLinks: false
}
let songFormats = ["mp3", "wav"];
let walker = walk.walk(musicBaseFolder, options),
    allSongs = [];
let songIndex = 0;

String.prototype.removeNull = function () {
    try {
        return this.replace(/\0/g, "");
    } catch (err) {
        return this;
    }
}

// @ts-ignore
walker.on("file", (root, fileStats, next) => {
    
    let url = path.join(root, fileStats.name.replace(/\\/g, "/"));
    fs.readFile(url, function () {
        // let ext = fileStats.name.split(".")[1];
        let ext = "mp3";
        if (fileStats.name.includes(".mp3")) {
            id3({
                file: url,
                type: id3.OPEN_LOCAL
            }, (err, tags) => {
                if (err) {
                    console.log(err)
                }
                console.log(fileStats.name);
                let hash = encrypt(url);
                allSongs.push({
                    // type: ext,
                    id: songIndex,
                    name: fileStats.name ? fileStats.name.removeNull() : "",
                    title: tags.title,
                    artist: tags.artist ? tags.artist.removeNull() : "",
                    year: tags.year,
                    album: tags.album,
                    track: tags.v1.track,
                    hash: hash
                });
                songIndex += 1;
            });
        }
        next();
    });

    writeFile(allSongs);
});
console.log("songsPersonal.json created...");

function writeFile(songsObj) {
    fs.writeFile("./data/songsPersonal.json", JSON.stringify({
        "songs": songsObj
    }, null, 4), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

function encrypt(url){
    var cipher = crypto.createCipher("aes-256-ctr", "test")
    var crypted = cipher.update(url,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}