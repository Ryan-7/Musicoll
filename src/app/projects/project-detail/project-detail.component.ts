import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @ViewChild('title') title;
  @ViewChild('lyrics') lyrics;
  @ViewChild('notes') notes;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { 
  } 

  project; 
  projectId;
  loading: boolean = true;
  
  editingTitle: boolean = false;
  editingLyrics: boolean = false;
  editingNotes: boolean = false;


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
          this.editingTitle = false;
          dataToSave = this.title.nativeElement.value;
          break;
      case 'lyrics':
          this.editingLyrics = false;
       //   dataToSave = this.lyrics.nativeElement.value;
          break;
      case 'notes':
          this.editingNotes = false;
          break;
    }
    this.update(dataToSave);
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
    console.log(dataToSave);
    // talk to http service 
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.editingTitle = false;
      this.loading = true;
      console.log(params)
      console.log(params.get('id'));
      this.projectId = params.get('id');
      this.project = this.httpService.getProjectById(this.projectId) // put loader in here once subscribed, 
      console.log(this.project)

      setTimeout(() => {
        this.loading = false;
      }, 500)
      
    })
    // use id to hit database 

  }

}
