import { Component, OnInit, ViewChild } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-project-landing',
  templateUrl: './project-landing.component.html',
  styleUrls: ['./project-landing.component.scss']
})
export class ProjectLandingComponent implements OnInit {


  private stream: MediaStream;
  private recordRTC: any;
  private recordedFile: any;

  @ViewChild('audio') audio;

  constructor() { }
  
  startRecording() {

    // set the media constraints for audio only.
    let mediaConstraints = {
      video: false,
      audio: true
    };

    // Navigator is an object that refers to the browser, we can access media devices like the Mic.
    // Will return a stream which we can use. 
    
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      this.successConnecting(stream);
    }).catch((err) => {
      console.log(err);
      console.log('Cannot access Microphone')
    })

}

  successConnecting(stream: MediaStream) {
    // Use the recordRTC library. 
    this.recordRTC = RecordRTC(stream, { type: 'audio', mimeType: 'mp3'});
    this.recordRTC.startRecording();
  }

  stopRecording() {
    this.recordRTC.stopRecording((audioURL) => {
      this.audio.nativeElement.src = audioURL; // Set the audio element src for playback. 
      this.recordedFile = this.recordRTC.getBlob(); // Save audio file to variable 
      // save audio file to S3 bucket 
   //   console.log(recordedFile)
    });
  }

  saveRecording() {
    this.recordRTC.save('audio.webm');
  }

 

  ngOnInit() {

  }

}
