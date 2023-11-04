import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from './login.service';


//Creacion de interceptor para modificar las solicitudes agregando en la cabezera un token de seguridad

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor(private loginService:LoginService){}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
let  authReq=req;
const token=this.loginService.getToken();
if(token!= null){
    authReq=authReq.clone(
        {
            setHeaders:{Authorization:`Bearer ${token}`}
        })
}
return next.handle(authReq);

}
}

//Exportamos este interceptor para importarlo en app.module.ts en providers
export const AuthInterceptorProviders=[
    {

        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
    }
]