import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

declare var Recorder; 


@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit, OnDestroy {

  @ViewChild('audioPlayback') audioPlayback;

  private audioContext: AudioContext;
  private stream: MediaStream;

  realAudioInput = null;
  audioRecorder = null;

  recording: boolean = false;
  recorderHasTrack: boolean = false;
  errorRecording: boolean = false;
  
  
  constructor() { }

  startRecording() {
    console.log('start recording');
    this.recording = true;
    this.audioRecorder.clear();
    this.audioRecorder.record();
  }

  stopRecording() {
    console.log('Stop recording');
    this.recording = false;
    this.audioRecorder.stop();
    this.audioRecorder.exportWAV((blob) => {
      var url = (window.URL).createObjectURL(blob);
      this.audioPlayback.nativeElement.src = url;
      if (this.audioPlayback.nativeElement.src !== "") {
        this.recorderHasTrack = true;
      }
    });
  }

  saveRecording(){
    console.log('download');
  }

  deleteRecording() {
    this.audioPlayback.nativeElement.src = "";
    this.recorderHasTrack = false;
  }

  streamSuccess(stream: MediaStream) {
    this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
    this.audioRecorder = new Recorder( this.realAudioInput );
  }



  ngOnInit() {

    console.log(this.audioPlayback.nativeElement.src);
    this.audioPlayback.nativeElement.src = "";
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
    console.log(navigator.mediaDevices.getSupportedConstraints()); // Differs by browser 

    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      navigator.mediaDevices.getSupportedConstraints()['echoCancellation'] = false
      this.streamSuccess(stream);
    }).catch((e) => {
      console.log(e);
      this.errorRecording = true;
    })
  }

  ngOnDestroy() {
    console.log('destroyed')
    this.audioContext.close();  // Prevent several audio instances
    this.recording = false; 
  }
 
}
