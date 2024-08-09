import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
 

  private readonly _ACCESS_TOKEN_KEY = 'accessToken';

  constructor() { }

  setAccessToken(token: string): void {
    localStorage.setItem(this._ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this._ACCESS_TOKEN_KEY);
  }

  isTokenValid(): boolean {
    const token = this.getAccessToken();
   
    
    if (!token) {
      return false;
    }
    
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.removeItem(this._ACCESS_TOKEN_KEY); 
      return false;
    }

    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }
}
