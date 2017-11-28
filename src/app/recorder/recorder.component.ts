import { Component, OnInit, ViewChild } from '@angular/core';

declare var Recorder; 


@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

  @ViewChild('audio') audio;

  private audioContext: AudioContext;
  private stream: MediaStream;

  realAudioInput = null;
  audioRecorder = null;
  
  
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
    this.audioRecorder.exportWAV(this.doneEncoding.bind(this)); 
    // 'this' in its current context refers to this object, 'RecorderComponent' 
    // we bind it so when using 'this' within doneEncoding(), it will refer to RecorderComponent
  }

  doneEncoding(blob) {
    var url = (window.URL).createObjectURL(blob);
    this.audio.nativeElement.src = url;
  }

  streamSuccess(stream: MediaStream) {
    this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
    this.audioRecorder = new Recorder( this.realAudioInput );
  }



  ngOnInit() {

  //  console.log(this.audio);

    // console.log(!navigator.getUserMedia)
    // if (!navigator.getUserMedia)
    //   navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    this.audioContext = new AudioContext();
    
    let mediaConstraints = {
      audio: {
        echoCancellation: false
      } as any
    }
    console.log(navigator.mediaDevices.getSupportedConstraints()); // Current constraint options 
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      this.streamSuccess(stream);
    }).catch((e) => {
      console.log(e);
    })
  }
 
}
