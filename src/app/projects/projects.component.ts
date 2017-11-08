import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any;
  filteredProject: String = "";


  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { 
  } 

  ngOnInit() {
    this.activatedRoute.url.subscribe((res) => {
      console.log(res)
    })

    this.projects = this.httpService.mockData;
    console.log(this.projects[0].name);
  }

}
