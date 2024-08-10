import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectCreationRequest } from '../model/project-creation-request';
import { Project } from '../model/project';
import { ProjectUpdateRequest } from '../model/project-update-request';
import { TodoCreationRequest } from '../model/todo-creation-request';
import { TodoRequest } from '../model/todo-request';
import { TodoUpdateRequest } from '../model/todo-update-request';
import { TodoStatusUpdateRequest } from '../model/todo-status-update-request';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = '/api/v1/project';

  constructor(private http:HttpClient) { }

  createProject(req:ProjectCreationRequest) :Observable<Project>{
    return this.http.post<Project>(`${this.apiUrl}/saveProject`,req);
  }
  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/findProject`, {
      params: { id: projectId.toString() }
    });
  }

  updateProject(req: ProjectUpdateRequest) :Observable<Project>{
    return this.http.post<Project>(`${this.apiUrl}/updateProject`,req);
  }

  createTodo(req: TodoCreationRequest):Observable<Project> {
   return this.http.post<any>(`${this.apiUrl}/createTodo`,req);
  }
  deleteTodo(req: TodoRequest):Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/deleteTodo`,req);
  }
 
  updateTodo(req: TodoUpdateRequest) :Observable<Project>{
    return this.http.post<Project>(`${this.apiUrl}/updateTodo`,req);
  }
  updateProjectStatus(req: TodoStatusUpdateRequest):Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/updateTodoStatus`,req);
  }


}
