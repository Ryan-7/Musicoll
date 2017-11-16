import { ProjectsComponent } from './../projects.component';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @ViewChild('title') title;
  @ViewChild('lyrics') lyrics;
  @ViewChild('notes') notes;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpService: HttpService, private projectsComponent: ProjectsComponent) { 
  } 

  project; // need to add model 
  projectAudio;
  projectId; // need to add model 
  loading: boolean = true;
  
  editingTitle: boolean = false;
  editingLyrics: boolean = false;
  editingNotes: boolean = false;

  savingTitle: boolean = false;

  deleteProject() {
    this.loading = true;
    this.httpService.deleteProject(this.projectId).subscribe((res) => {

      setTimeout(() => { // only used to simulate http request time 
        this.projectsComponent.getProjectList(); 
        this.loading = false;
        this.router.navigate(['projects']);
      }, 500)
    })
  }

  play(file) {
    console.log(file);
  }


  edit(inputArea) {
    console.log(inputArea)
    switch(inputArea) {
      case 'title':
          this.editingTitle = true;
          setTimeout(() => { this.title.nativeElement.focus(); }); // setTimouet to allow time for ViewChild to bind to element.
          break;
      case 'lyrics':
          this.editingLyrics = true;
          setTimeout(() => { this.lyrics.nativeElement.focus(); });
          break;
      case 'notes':
          this.editingNotes = true;
          setTimeout(() => { this.notes.nativeElement.focus(); });
          break;
    }    
  }

  save(inputArea) {
    let dataToSave;
    switch(inputArea) {
      case 'title':
          this.savingTitle = true;
          this.project.name = this.title.nativeElement.value;
          break;
      case 'lyrics':
          this.editingLyrics = false;
          this.project.lyrics = this.lyrics.nativeElement.value;
          break;
      case 'notes':
          this.editingNotes = false;
          this.project.notes = this.notes.nativeElement.value;
          break;
    }

    this.update(this.project);

  //  this.update(dataToSave);
  }


  cancel(inputArea) {
    if (inputArea === 'title') {
      this.editingTitle  = false;
    } else if (inputArea === 'lyrics') {
      this.editingLyrics = false;
    } else if (inputArea === 'notes') {
      this.editingNotes = false;
    }
  }

  update(dataToSave) {
    this.httpService.updateProject(this.projectId, dataToSave).subscribe((res) => {
      
      setTimeout(() => {
        this.project = res;
        this.editingTitle = false;
        this.savingTitle = false;
        this.projectsComponent.getProjectList();
      }, 1000)

    })
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.loading = true;
      this.projectId = params.get('id');
      
      // everytime the params change, we will query the API for that project id's data.

      this.httpService.getProjectById(this.projectId).subscribe((res) => {
        this.project = res;
        this.projectAudio = res['audio'];
        console.log(this.project);
        // In real world, set loading back to false here. 
      })

      // if error trying to get id, show a "project not found"
      // could re-direct to error page... ?


      setTimeout(() => { // Simulate HTTP request time 
        this.loading = false;
      }, 500)
      
    })

  }

}
