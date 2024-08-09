import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/v1/user';
  constructor(private http:HttpClient) { }

  findUser(userId: number):Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUser/${userId}`);
  }

}
