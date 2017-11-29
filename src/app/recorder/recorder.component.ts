import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

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
    this.audioRecorder.exportWAV((blob) => {
      var url = (window.URL).createObjectURL(blob);
      this.audio.nativeElement.src = url;
    });
  }

  saveRecording(){
    console.log('download');

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
        echoCancellation: false,
        echoCancelation: false, // TypeScript / IE Edge has a spelling error. 
        noiseSuppression: false // FireFox, sounds terrible with this set to true while recording instruments.
      } as any
    }
    console.log(navigator.mediaDevices)
    navigator.mediaDevices.getSupportedConstraints()['echoCancellation'] = false; // Current constraint options 
    console.log(navigator.mediaDevices.getSupportedConstraints())
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      navigator.mediaDevices.getSupportedConstraints()['echoCancellation'] = false
      this.streamSuccess(stream);
    }).catch((e) => {
      console.log(e);
    })
  }

  ngOnDestroy() {
    this.audioContext.close();
  }
 
}
