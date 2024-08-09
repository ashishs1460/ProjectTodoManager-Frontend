import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _ACCESS_TOKEN_KEY = 'accessToken'

  constructor() { }


  setAccessToken(token:string){
    localStorage.setItem(this._ACCESS_TOKEN_KEY,token)
  }
  getAccessToken():string|null{
    return localStorage.getItem(this._ACCESS_TOKEN_KEY);
  }
}
