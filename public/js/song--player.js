/// @ts-check
"use strict";

const SongPlayer = (function(){
    const AUDIO = document.getElementById("audio");

    let nowPlaying = null;
    /// @ts-ignore
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    let context = new AudioContext(),
        contexts = [],
        source = null,
        wasStopCommand = false;

    Events.subscribe("song/play", function(info){
        nowPlaying = info.song;
        initPlayback(info);     
    });

    Events.subscribe("song/stop", function(info){
        wasStopCommand = true;
        stopSongPlaying();     
    });

    // Events.subscribe("song/back", function(info){
    //     startFromBeginning();     
    // });

    Events.subscribe("song/next", function(info){
          let nextSong = SongService.getNextSong(nowPlaying);

          Events.emit("playing/update", {
              newSong: nextSong
          });

          initPlayback(nextSong);
    });

    // Events.subscribe("upload/progress", res => {
    //     // console.log(res);
    //     let buffer = res.partialContent.response;
    //     if(buffer && buffer !== undefined){
    //         process(buffer);
    //     } else {
    //         // console.log("not loaded...")
    //         // console.log(buffer);
    //     }
    // });

    function initPlayback(info){  
        let song = info.song ? info.song : info;      
        let url = song.url;
        nowPlaying = song;
        // SongService.getSongFromServer(song)
        //     .then(data => {
        //         console.log(data);
        //     });
            // .then(data => {  
            //     console.log(data.response);
                // console.log(typeof data.response);    
            // process(data.response, song);
        // });   

        AUDIO.src = `/song?hash=${song.hash}`;        
        setTimeout(function(){
            AUDIO.play();
        }, 1000)
        
    }

    // function startFromBeginning() {
    //     AUDIO.stop();
    //     AUDIO.start();
    // }

    // function stopSongPlaying() {
    //     if (source){
    //         source.stop();
    //     }
    // }

    // function cacheSource(source, song) {
    //     if (!contexts.some(contextObj => contextObj["id"] === song.id)){
    //         contexts.push({
    //             id: song.id,
    //             source: source
    //         });
    //     }
    // }
    
    // function process(audiostream, song = null) {
    //     stopSongPlaying();
    //     source = context.createBufferSource(); // Create Sound Source
        
    //     source.addEventListener("ended", (e) => {
    //         // console.log(e);
    //         if (!wasStopCommand){
    //             console.log("wasNotStop");
    //             Events.emit("song/next");
    //         }
    //     });    
    //     context.decodeAudioData(audiostream).then(buffer => {
    //         source.buffer = buffer;
    //         playSource(source);
    //     });
    // }

    // function playSource(source){
    //     source.connect(context.destination); 
    //     source.start(0);
    // }
}());