import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { TokenService } from "../services/token.service";
import { Store } from "@ngrx/store";
import { SpinnerState } from "../store/spinner.state";
import { setLoadingSpinner } from "../store/spinner.action";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    private readonly baseUrl: string = 'http://localhost:8080';
    private readonly excludedUrls: string[] = ['https://api.github.com/gists'];

    constructor(private tokenService: TokenService,
                private store: Store<SpinnerState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        const isExcludedUrl = this.excludedUrls.some(url => req.url.startsWith(url));

       
        let clonedRequest = req.clone({
            url: req.url.startsWith('http') ? req.url : `${this.baseUrl}${req.url}`
        });

        if (!isExcludedUrl) {
            const token = this.tokenService.getAccessToken();
            if (token) {
                clonedRequest = clonedRequest.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }

        this.store.dispatch(setLoadingSpinner({ status: true }));

        return next.handle(clonedRequest).pipe(
            finalize(() => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
            })
        );
    }
}
