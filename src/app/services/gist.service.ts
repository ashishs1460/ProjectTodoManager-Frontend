import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private backendOAuthUrl = 'https://todohatio-btexhmcpaherbvcy.eastus-01.azurewebsites.net/api/v1/oauth/exchange';
  private githubGistUrl = 'https://api.github.com/gists';

  constructor(private http: HttpClient) { }

  getGithubToken(code: string): Observable<any> {
   
    const body = {
      code: code,
      redirectUri: 'https://project-todo-manager-frontend.vercel.app/home/projectDetails'
    };

    return this.http.post(this.backendOAuthUrl, body, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      })
    });
  }

  createGist(accessToken: string, gistData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.githubGistUrl, gistData, { headers });
  }
}
