import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectCreationRequest } from '../model/project-creation-request';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

 
  private apiUrl = '/api/v1/project';

  constructor(private http:HttpClient) { }

  createProject(req:ProjectCreationRequest) :Observable<Project>{
    return this.http.post<Project>(`${this.apiUrl}/saveProject`,req);
  }
}
