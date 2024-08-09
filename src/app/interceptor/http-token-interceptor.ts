import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor{

    private readonly baseUrl: string = 'http://localhost:8080'; 

    constructor(private tokenService:TokenService){
  
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getAccessToken();
        const url = req.url.startsWith('http') ? req.url : `${this.baseUrl}${req.url}`;
        let clonedRequest = req.clone({url});
        if (token) {
          clonedRequest = clonedRequest.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
    
        return next.handle(clonedRequest);
    }

}