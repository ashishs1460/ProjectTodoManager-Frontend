import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(">>>>>>>>>>>")
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if(tokenService.isTokenNotValid()){
    console.log("Inside");
    
    router.navigate(['/login'])
    return false;
  }
  return true;
};
