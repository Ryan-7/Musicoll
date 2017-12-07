import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { HttpService } from './../services/http.service';
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
  
  constructor(private httpService: HttpService) { }

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
      console.log(this.downloadAudio);
      this.downloadAudio.nativeElement.download = "zoutput";
      this.downloadAudio.nativeElement.href = url;
      this.audioPlayback.nativeElement.src = 'https://s3.us-east-2.amazonaws.com/musicollapp/blob.ogg';
    };

    this.recorderHasTrack = true;

  }

  saveRecording(){
    console.log('Save to Project');
    let trackInfo = {
      trackName: this.trackName,
      trackDescription: this.trackDescription
    }
 //   console.log(this.currentProjectId); 
    console.log(this.blob)
    // Hit HTTP service with blob, track name, track description, and project ID to add it under. 
    this.httpService.addAudio(this.currentProjectId, this.blob, trackInfo).subscribe((res) => {
      console.log('song:')
      console.log(res);
    });
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
