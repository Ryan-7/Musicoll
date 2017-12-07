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

  deleteProject(projectId) {
    return this.httpClient.delete('http://localhost:3000/api/projects/' + projectId);
  }

  updateProject(projectId, dataToSave) {
    return this.httpClient.patch('http://localhost:3000/api/projects/' + projectId, dataToSave);
  }

  // addAudio(projectId, trackInfo, blob) {
  //   return this.httpClient.put('http://localhost:3000/api/audio/' + projectId, trackInfo, blob); 
  // }

  addAudio(projectId, blob, trackInfo) {
    let formData = new FormData();
    formData.append('upload', blob);
    console.log(formData);
    return this.httpClient.post('http://localhost:3000/api/projects/audio/' + projectId, formData, {responseType: "blob"}); 
  }

  // addAudio(projectId, trackInfo) {
  //   let formData = new FormData();
  //   let content = 'Hello this is some text';
  //   let blob = new Blob([content], {type: "multipart/form-data"});
  //   formData.append('upload', blob);
  //   return this.httpClient.post('http://localhost:3000/api/projects/audio/' + projectId, formData, {responseType: "blob"}); 
  // }

}
