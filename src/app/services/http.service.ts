import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, ResponseOptions } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { }


  // Each project will consist of the following model: 

  newProject() {
    return this.httpClient.get('http://localhost:3000/api/projects/new')
  }
  
  getProjectList() {
    return this.mockData.slice();
  }

  getProjectById(projectId) {
    return _.find(this.mockData, {_id: projectId}); 
  }


  mockData = [
    {
      _id: "3438738402",
      _creator: "38203034f-3fk30",
      name: 'Awesome Project',
      lyrics: '\nLorem ipsum dolor sit ame\nconsectetur adipiscing elit\nsed do eiusmod tempor incididunt\ndtlabore et dolore magna aliqua\nUt enim ad minim veniam, quis nostrud\nexercitation ullamco laboris nisi ut\naliquip ex ea commodo consequat\nLorem ipsum dolor sit ame\nconsectetur adipiscing elit\nsed do eiusmod tempor incididunt\ndtlabore et dolore magna aliqua\nUt enim ad minim veniam, quis nostrud\nexercitation ullamco laboris nisi ut\naliquip ex ea commodo consequat',
      notes: 'The song is written in the key of C#',
      audio: [
        {
          file: 'someFile.mp3',
          title: 'some title',
          description: 'some description of audio file',
          date: new Date()
        }
      ],
      comments: [
        {
          author: "Ryan",
          date: new Date(),
          body: "This is some comment"
        }
      ]

    },
    {
      _id: "34387438402",
      _creator: "38203034f-3fk30",
      name: 'Something New with Really long name',
      lyrics: 'lyrics and stuff \nand a new line',
      notes: 'The song is written in the key of F#',
      audio: [
        {
          file: 'someFile.mp3',
          description: 'some description of audio file'
        }
      ],
      comments: [
        {
          author: "Ryan",
          date: new Date(),
          body: "This is some comment"
        }
      ]

    },
    {
      _id: "34383738402",
      _creator: "38203034f-3fk30",
      name: 'Great Thing Idea',
      lyrics: 'lyrics and stuff \nand a new line',
      notes: 'The song is written in the key of B flat.',
      audio: [
        {
          file: 'someFile.mp3',
          description: 'some description of audio file'
        }
      ],
      comments: [
        {
          author: "Ryan",
          date: new Date(),
          body: "This is some comment"
        }
      ]

    },
    {
      _id: "3438373438402",
      _creator: "38203034f-3fk30",
      name: 'Project of the Century',
      lyrics: 'lyrics and stuff',
      notes: 'lots of notes',
      audio: [
        {
          file: 'someFile.mp3',
          description: 'some description of audio file'
        }
      ],
      comments: [
        {
          author: "Ryan",
          date: new Date(),
          body: "This is some comment"
        }
      ]

    }
  ]

  // Will use Express to pick and just send back the title and id when first arriving on projects page
  // that way we're not downloading all the projects at once. 
  // Can have a separate http request for it. 

}
