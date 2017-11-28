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
    console.log('start recording');
    this.audioRecorder.clear();
    this.audioRecorder.record();
  }

  stopRecording() {
    console.log('Stop recording');
    this.audioRecorder.stop();
  }

  saveRecording(){
    console.log('download');
    this.audioRecorder.exportWAV(this.doneEncoding);
  }

  doneEncoding( blob ) {
   // Recorder.forceDownload( blob, "myRecording.wav" );
   // this.recIndex++;
    var url = (window.URL).createObjectURL(blob);
    window.open(url)
  }

  streamSuccess(stream: MediaStream) {
    this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
    this.audioRecorder = new Recorder( this.realAudioInput );
  }



  ngOnInit() {
    // if (!navigator.getUserMedia)
    //   navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
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

    navigator.getUserMedia(mediaConstraints, this.streamSuccess.bind(this), function(e) {
          alert('Error getting audio');
          console.log(e);
      });
  }
 
}
