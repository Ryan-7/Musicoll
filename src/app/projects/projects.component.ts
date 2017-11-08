import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectSelected = false;

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(this.route.snapshot.params['id']);
    })
  }

}
