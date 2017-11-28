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

    console.log(!navigator.getUserMedia)
    // if (!navigator.getUserMedia)
    //   navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    this.audioContext = new AudioContext();
    
    // let mediaConstraints = {
    //   audio: true,
    //   mandatory: {
    //     "echoCancellation": "false",
    //     "googEchoCancellation": "false",
    //     "googAutoGainControl": "false",
    //     "googNoiseSuppression": "false",
    //     "googHighpassFilter": "false",
    //     "googTypingNoiseDetection": "false"
    //   },
    //   optional: []
    // }

    let mediaConstraints = {
      audio: {
        echoCancellation: false
      } as any
    }
    console.log(navigator.mediaDevices.getSupportedConstraints());
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      this.streamSuccess(stream);
    }).catch((e) => {
      console.log(e);
    })
  }
 
}
