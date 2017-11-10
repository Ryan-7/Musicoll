import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @ViewChild('title') theTitle;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { 
  }

  project; 
  projectId;
  loading: boolean = true;
  editTitle: boolean = false;

  editingTitle() {
    this.editTitle = true;
    console.log(this.theTitle)
    
    setTimeout(() => { this.theTitle.nativeElement.focus(); });
  }

  savingTitle() {
    this.editTitle = false;
    console.log(this.theTitle)
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.editTitle = false;
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
