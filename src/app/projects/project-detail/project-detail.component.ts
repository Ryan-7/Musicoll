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

  project; // need to add model 
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
          dataToSave = this.lyrics.nativeElement.value;
          break;
      case 'notes':
          this.editingNotes = false;
          dataToSave = this.notes.nativeElement.value;
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
      this.loading = true;
      let projectId = params.get('id');
      
      // everytime the params change, we will query the API for that project id's data.

      this.httpService.getProjectById(projectId).subscribe((res) => {
        this.project = res;
        // In real world, set loading back to false here. 
      })


      setTimeout(() => {
        this.loading = false;
      }, 500)
      
    })

  }

}
