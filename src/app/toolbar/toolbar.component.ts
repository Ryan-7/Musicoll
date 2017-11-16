import { Router } from '@angular/router';
import { HttpService } from './../services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() projectId;

  constructor(private httpService: HttpService, private router: Router) { }

  delete() {
    console.log(this.projectId);
    this.httpService.deleteProject(this.projectId).subscribe((res) => {
      // need a loading icon for modal until this finishes and then closes.
      this.router.navigate(['projects']); 
      console.log(res)
    })
  }

  ngOnInit() {
  }

}
