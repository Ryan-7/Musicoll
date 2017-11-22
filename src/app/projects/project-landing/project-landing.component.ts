import { Component, OnInit, ViewChild } from '@angular/core';
import * as RecordRTC from 'recordrtc';

declare const navigator: any;
declare const MediaRecorder: any;


@Component({
  selector: 'app-project-landing',
  templateUrl: './project-landing.component.html',
  styleUrls: ['./project-landing.component.scss']
})
export class ProjectLandingComponent implements OnInit {

  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;

  constructor() {
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        audio.load();
        audio.play();
      };

      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getUserMedia({ audio: true }, onSuccess, e => console.log(e));
  }

  public record() {
    this.isRecording = true;
    this.mediaRecorder.start();
    console.log(this.chunks)
  }

  public stop() {
    this.isRecording = false;
    this.mediaRecorder.stop();
    console.log(this.chunks)
  }

  ngOnInit() {
  

  }

}
