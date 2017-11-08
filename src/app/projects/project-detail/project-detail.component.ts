import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  
  constructor(private activatedRoute: ActivatedRoute) { 


  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      console.log(params)
      console.log(params.get('id'));
    })
  }

}
