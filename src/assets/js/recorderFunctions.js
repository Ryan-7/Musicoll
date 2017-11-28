/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0; 


function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
    console.log('save audio')
}


function doneEncoding( blob ) {
    console.log('done encoding')
    Recorder.forceDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    recIndex++;
    console.log('done encoding executed')
}


function startRecording() {
    console.log(audioRecorder)
    console.log('start recording works')
    if (!audioRecorder)
        return;
    audioRecorder.clear();
    audioRecorder.record();
}

function stopRecording() {
    console.log('stop recording works')
    audioRecorder.stop();
}



function gotStream(stream) {
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioRecorder = new Recorder( realAudioInput );
}

// This runs first, which talks to the browser to use the mic
// Then we call "gotStream()" if successful. 

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "true", // audio processing 
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false",
                    "googTypingNoiseDetection": "false",
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio );