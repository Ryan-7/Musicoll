import { Component, OnInit, ViewChild } from '@angular/core';
// import '../../../assets/js/recorderFunctions.js';
// import '../../../assets/js/recorder.js';


declare function startRecording(button): void;
declare function stopRecording(button): void;
declare var recorderObject: any;

@Component({
  selector: 'app-project-landing',
  templateUrl: './project-landing.component.html',
  styleUrls: ['./project-landing.component.scss']
})
export class ProjectLandingComponent implements OnInit {


  constructor() { }
  
  start(button){
  	startRecording(button);
  };
  
  
  stop(button){
  	stopRecording(button);
  }
 

  ngOnInit() {
    recorderObject.recorder();

  }

}
