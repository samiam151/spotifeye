/// @ts-check
"use strict";

const SongPlayer = (function(){
    const AUDIO = new Audio();
    let nowPlaying = null;

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
    
    function getPlayedPercentage(){
        if (!AUDIO.paused){
            let played = AUDIO.currentTime,
                duration = AUDIO.duration;
            return played / duration;
        }
    }
    
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

    function startFromBeginning() {
        if (!AUDIO.paused){
            AUDIO.currentTime = 0;
        }
    }

    function stopSongPlaying() {
        if (!AUDIO.paused){
            AUDIO.pause();
            AUDIO.currentTime = 0;
        }
    }

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

    return {
        audio: AUDIO
    }
}());