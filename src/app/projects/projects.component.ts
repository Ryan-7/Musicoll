import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any;

  constructor(private httpService: HttpService) { 
  }

  ngOnInit() {
    this.projects = this.httpService.mockData;
    console.log(this.projects[0].name);
  }

}
