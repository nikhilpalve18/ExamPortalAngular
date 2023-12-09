import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login: LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
         // add jwt token into request urls
        
        let authReq = req;
        const token = this.login.getToken();
        if(token!=null){
            authReq = authReq.clone({
                setHeaders:{Authorization: `Bearer ${token}`}
            });
        }
        return next.handle(authReq);
    }   
}



export const AuthInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];

























