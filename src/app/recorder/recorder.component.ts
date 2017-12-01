import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';


import * as RecordRTC from 'recordrtc';

declare const navigator: any;
declare const MediaRecorder: any;

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit, OnDestroy {

  @ViewChild('audioPlayback') audioPlayback;
  @ViewChild('downloadAudio') downloadAudio;


  private chunks: any = [];
  private mediaRecorder: any;

  recording: boolean = false;
  recorderHasTrack: boolean = false;
  errorRecording: boolean = false;
  
  
  constructor() { }

  startRecording() {
    console.log('start recording');
    this.recording = true;
    this.mediaRecorder.start();
  }

  stopRecording() {
    console.log('Stop recording');
    this.recording = false;
    this.mediaRecorder.stop();


    // this.audioRecorder.exportWAV((blob) => {
    //   var url = (window.URL).createObjectURL(blob);
    //   this.audioPlayback.nativeElement.src = url;
    //   console.log(this.audioPlayback.nativeElement.src)
    //   if (this.audioPlayback.nativeElement.src !== "") {
    //     this.recorderHasTrack = true;
    //   }

    //   this.downloadAudio.nativeElement.download = "output.wav";
    //   this.downloadAudio.nativeElement.href = url;
    //   console.log(this.downloadAudio)
    // });


  }

  saveRecording(){
    console.log('download');
  }

  deleteRecording() {
    this.audioPlayback.nativeElement.src = "";
    this.recorderHasTrack = false;
  }

  streamSuccess(stream: MediaStream) {
    // this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
    // this.audioRecorder = new Recorder( this.realAudioInput, {numChannels: 1} ); // Mono
  }



  ngOnInit() {

    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        var url = (window.URL).createObjectURL(blob)
        this.downloadAudio.nativeElement.download = "output.ogg";
        this.downloadAudio.nativeElement.href = url;
        this.audioPlayback.nativeElement.src = url
      };

      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getUserMedia({ audio: {
      echoCancellation: false
    } }, onSuccess, e => console.log(e));

    // console.log(this.downloadAudio.nativeElement.href)
    // this.audioPlayback.nativeElement.src = "";
    // this.audioContext = new AudioContext();
    
    // let mediaConstraints = {
    //   audio: {
    //     echoCancellation: false,
    //     echoCancelation: false, // TypeScript / IE Edge has a spelling error. 
    //     noiseSuppression: false // FireFox, sounds terrible with this set to true while recording instruments.
    //   } as any
    // }
    // console.log(navigator.mediaDevices.getSupportedConstraints()); // Differs by browser 

    // navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
    //   this.streamSuccess(stream);
    // }).catch((e) => {
    //   console.log(e);
    //   this.errorRecording = true;
    // })
  }

  ngOnDestroy() {
    // console.log('destroyed')
    // this.audioContext.close();  // Prevent several audio instances
    // this.recording = false; 
  }
 
}
