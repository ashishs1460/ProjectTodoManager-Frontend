import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../model/registration-request';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../model/authentication-request';
import { AuthenticationResponse } from '../model/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient) { }

  register(registerRequest: RegistrationRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`/api/v1/auth/register`, registerRequest, {
      observe: 'response',
      responseType: 'text' as 'json', // This will allow  to access the full HTTP response including status
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  login(loginRequest: AuthenticationRequest):Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`/api/v1/auth/authenticate`,loginRequest);
  }

}
