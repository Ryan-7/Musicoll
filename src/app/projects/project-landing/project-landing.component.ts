import { Component, OnInit, ViewChild } from '@angular/core';

// Declare functions I want to use from the recorderJS files. 
declare function startRecording(button): void;
declare function stopRecording(button): void;

declare var recorderObject: any; // An object with a method "recorder()" which interacts with the getMedia() from the browser for mic use.

@Component({
  selector: 'app-project-landing',
  templateUrl: './project-landing.component.html',
  styleUrls: ['./project-landing.component.scss']
})
export class ProjectLandingComponent implements OnInit {


  constructor() { }
  
  start(button){
  	startRecording(button); // referencing a function in the recorderJS file
  };
  
  
  stop(button){
  	stopRecording(button);  // referencing a function the recorderJS file
  }
 

  ngOnInit() {
    recorderObject.recorder(); // recorder() is a function on that object. 
      // We need to call this on Init so we can access the Mic with the native browser method navigator.getUserMedia(); 

  }

}
