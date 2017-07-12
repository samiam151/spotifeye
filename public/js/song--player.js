/// @ts-check
"use strict";

const SongPlayer = (function(){
    /// @ts-ignore
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    let context = new AudioContext(),
        source = null;

    Events.subscribe("song/play", function(info){
        playCallback(info);     
    });

    Events.subscribe("song/stop", function(info){
        stopSongPlaying();     
    });

    function playCallback(info){
        let song = info.song;
        let url = song.url;

        SongService.getSongFromServer(song)
            .then(data => {      
                var Data = data.response;   
                process(Data);
        });
    }

    function stopSongPlaying(){
        if (source){
            source.stop();
        }
    }

    function process(Data) {
        stopSongPlaying();
        source = context.createBufferSource(); // Create Sound Source
        context.decodeAudioData(Data, function(buffer){
            source.buffer = buffer;
            source.connect(context.destination); 
            source.start(context.currentTime);
        })
    }
}());