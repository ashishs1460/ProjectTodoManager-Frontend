import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { TokenService } from "../services/token.service";
import { Store } from "@ngrx/store";
import { SpinnerState } from "../store/spinner.state";
import { setLoadingSpinner } from "../store/spinner.action";
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor{

    private readonly baseUrl: string = 'http://localhost:8080'; 

    constructor(private tokenService:TokenService,
        private store:Store<SpinnerState>
    ){
  
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
        this.store.dispatch(setLoadingSpinner({ status: true }));
    
        return next.handle(clonedRequest).pipe(
            finalize(() => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
            })
        );
    }

}