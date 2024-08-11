import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private backendOAuthUrl = 'http://localhost:8080/api/v1/oauth/exchange';
  private githubGistUrl = 'https://api.github.com/gists';

  constructor(private http: HttpClient) { }

  getGithubToken(code: string): Observable<any> {
   
    const body = {
      code: code,
      redirectUri: 'http://localhost:4200/home/projectDetails'
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
