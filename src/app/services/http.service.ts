import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, ResponseOptions } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { }


  // Each project will consist of the following model: 

  newProject() {
    return this.httpClient.get('http://localhost:3000/api/projects/new');
  }
  
  getProjectList() {
    return this.httpClient.get('http://localhost:3000/api/projects/list');
  }

  getProjectById(projectId) {
    return this.httpClient.get('http://localhost:3000/api/projects/' + projectId);
  }

}
