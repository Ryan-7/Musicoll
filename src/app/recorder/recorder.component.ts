import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
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
  private blob: Blob;

  @Input() currentProjectId;

  recording: boolean = false;
  recorderHasTrack: boolean = false;
  errorRecording: boolean = false;
  
  trackName: string;
  trackDescription: string;
  
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

    this.mediaRecorder.onstop = (e) => {
      const audio = new Audio();
      this.blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
      this.chunks.length = 0;
      var url = (window.URL).createObjectURL(this.blob)
      this.downloadAudio.nativeElement.download = "output.ogg";
      this.downloadAudio.nativeElement.href = url;
      this.audioPlayback.nativeElement.src = url;
    };

    this.recorderHasTrack = true;

  }

  saveRecording(){
    console.log('Save to Project');
    console.log(this.currentProjectId); 
    console.log(this.trackName);
    console.log(this.trackDescription);
    // Hit HTTP service with blob, track name, track description, and project ID to add it under. 
  }

  deleteRecording() {
    this.audioPlayback.nativeElement.src = "";
    this.recorderHasTrack = false;
  }

  streamSuccess(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
  }


  ngOnInit() {

    let mediaConstraints = {
      audio: {
        echoCancellation: false,
        echoCancelation: false, // TypeScript / IE Edge has a spelling error. 
        noiseSuppression: false // FireFox, sounds terrible with this set to true while recording instruments.
      } as any
    }

    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      this.streamSuccess(stream);
    }).catch((e) => {
      console.log(e);
      this.errorRecording = true;
    })

  }

  ngOnDestroy() {
     this.recording = false; 
  }
 
}
