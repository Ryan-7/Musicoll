import { Component, OnInit } from '@angular/core';

declare var Recorder; 


@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

  private audioContext: AudioContext;
  private stream;
  
  realAudioInput = null;
  audioRecorder = null;
  recIndex = 0; 
  
  

  constructor() { }

startRecording() {
    console.log(this.audioRecorder)
    this.audioRecorder.clear();
    this.audioRecorder.record();
}

  stopRecording() {
    console.log('Stop recording')
  }

  saveRecording(){
    console.log('download')
  }

  gotStream(stream: MediaStream) {

    this.realAudioInput = this.audioContext.createMediaStreamSource(this.stream);
    this.audioRecorder = new Recorder( this.realAudioInput );
}

  ngOnInit() {
    this.audioContext = new AudioContext();
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
 
}
