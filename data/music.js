const fs = require("fs");
const path = require("path");
const walk = require("walk");
const audoMetaData = require("audio-metadata");
const id3 = require("id3js");

const musicBaseFolder = "C:/Users/samia/Music";
let options = {
    followLinks: false
}
let songFormats = ["mp3", "wav"];
let walker = walk.walk(musicBaseFolder, options),
    allSongs = [];


String.prototype.removeNull = function(){      
    try {
        return this.replace(/\0/g, "");
    } catch(err){
        return this;
    }   
}

walker.on("file", (root, fileStats, next) => {
    let url = path.join(root, fileStats.name.replace(/\\/g, "/"));
    fs.readFile(url, function () {
        let ext = fileStats.name.split(".")[1];
        
        if (songFormats.includes(ext)){
           id3({
               file: url,
               type: id3.OPEN_LOCAL
           }, (err, tags) => {
               if (err){
                   console.log(err)
               }
               console.log(tags);

                allSongs.push({
                    type: ext,
                    name: fileStats.name ? fileStats.name.removeNull() : "",
                    url: url,
                    title: tags.title,
                    artist: tags.artist ? tags.artist.removeNull() : "",
                    year: tags.year,
                    album: tags.album,
                    track: tags.v1.track
                });
           });
        }
        next();
    });

    writeFile(allSongs);
});

function writeFile(songsObj){
    fs.writeFile("./data/songsPersonal.json", JSON.stringify({"songs": songsObj}, null, 4), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("songsPersonal.json created...");
    });
}

