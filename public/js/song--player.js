/// @ts-check
"use strict";

const SongPlayer = (function(){
    let nowPlaying = null;
    /// @ts-ignore
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    let context = new AudioContext(),
        contexts = [],
        source = null;

    Events.subscribe("song/play", function(info){
        nowPlaying = info.song;
        initPlayback(info);     
    });

    Events.subscribe("song/stop", function(info){
        stopSongPlaying();     
    });

    // Events.subscribe("song/back", function(info){
    //     startFromBeginning();     
    // });

    Events.subscribe("song/next", function(info){
          stopSongPlaying();
          let nextSong = SongService.getNextSong(nowPlaying);

          Events.emit("playing/update", {
              newSong: nextSong
          });

          initPlayback(nextSong);
    });

    Events.subscribe("upload/progress", res => {
        console.log(res);
        let buffer = res.partialContent.response;
        if(buffer && buffer !== undefined){
            process(buffer);
        }
    });

    function initPlayback(info){  
        let song = info.song ? info.song : info;      
        let url = song.url;
        let id = song.id;
        // if (songInContexts){
        //     playSource(songInContexts["source"])
        // }

        SongService.getSongFromServer(song);
            // .then(data => {  
            //     console.log(data.response);
                // console.log(typeof data.response);    
            // process(data.response, song);
        // });

        
    }

    function startFromBeginning() {
        source.stop();
        source.start();
    }

    function stopSongPlaying() {
        if (source){
            source.stop();
        }
    }

    function cacheSource(source, song) {
        if (!contexts.some(contextObj => contextObj["id"] === song.id)){
            contexts.push({
                id: song.id,
                source: source
            });
        }
    }

    function process(audiostream, song = null) {
        stopSongPlaying();
        source = context.createBufferSource(); // Create Sound Source
        // cacheSource(source, song);
        console.log(audiostream);
        context.decodeAudioData(audiostream).then(buffer => {
            source.buffer = buffer;
            playSource(source);
        });
    }

    function playSource(source){
        source.connect(context.destination); 
        source.start(0);
    }
}());