/// @ts-check
/// <reference path="./events.js" />
/// <reference path="./songs--service.js" />
"use strict";

const SongPlayer = (function(){
    const AUDIO = new Audio();
    let nowPlaying = null;
    AUDIO.onended = function(){
         Events.emit("song/next");
    }

    Events.subscribe("song/play", function(info){
        nowPlaying = info.song;
        initPlayback(info);     
    });

    Events.subscribe("song/back", function(){
        startFromBeginning();
    });

    Events.subscribe("song/pause", function(){
        AUDIO.pause();
    });

    Events.subscribe("song/resume", function(){
        AUDIO.play();
    });

    Events.subscribe("song/next", function(info){
          let nextSong = SongService.getNextSong(nowPlaying);
          nowPlaying = nextSong;
          Events.emit("playing/update", {
              newSong: nextSong
          });

          initPlayback(nextSong);
    });
    
    function getPlayedPercentage(){
        if (!AUDIO.paused){
            let played = AUDIO.currentTime,
                duration = AUDIO.duration;
            return played / duration;
        }
    }
    
    function initPlayback(info){  
        let song = info.song ? info.song : info;      
        nowPlaying = song;

        AUDIO.src = `/song?hash=${song.hash}`;   

        if (AUDIO.readyState > 2){
            AUDIO.play();
        } else {
            setTimeout(function(){
                AUDIO.play();
            }, 500);
        }   
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

    function getNowPlaying(){
        return nowPlaying;
    }

    function pausePlaying(){
        AUDIO.pause();
    }

    return {
        audio: AUDIO,
        getNowPlaying: getNowPlaying    
    }
}());