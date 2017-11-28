import { Component, OnInit } from '@angular/core';

declare var Recorder; 


@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

  audioContext = new AudioContext();
  realAudioInput = null;
  audioRecorder = null;
  recIndex = 0; 
  
  

  constructor() { }

  startRecording() {
    console.log('Start recording')
  }

  stopRecording() {
    console.log('Stop recording')
  }

  saveRecording(){
    console.log('download')
  }

  gotStream(stream) {
    this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
    this.audioRecorder = new Recorder( this.realAudioInput );
}

  initAudio() {

    let mediaConstraints = {
      audio: true,
      mandatory: {
        "googEchoCancellation": "false",
        "googAutoGainControl": "false",
        "googNoiseSuppression": "false",
        "googHighpassFilter": "false",
        "googTypingNoiseDetection": "false"
      },
      optional: []
    }

navigator.getUserMedia(mediaConstraints, this.gotStream, function(e) {
        alert('Error getting audio');
        console.log(e);
    });
  }

  ngOnInit() {}
 
}
