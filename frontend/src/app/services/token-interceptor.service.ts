import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   //let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjY1MjU3Mzk5LCJleHAiOjE2NjUyNjA5OTksIm5iZiI6MTY2NTI1NzM5OSwianRpIjoiSlFwSWZjWGh6RnlONXd0SCIsInN1YiI6IjEiLCJwcnYiOiIzNTcwMTczZDc0NDhjZGIwMjc5MGMxOTdlOTFkOTkyOTk5YWMxMGZiIn0.tfdhCx37_tMuVgGtHGRDOSuGY4xtmvDzySAaFwrK1tY'
  let Auth=this.injector.get(UserServiceService)
// Authorization: `bearer ${Auth.getToken()}`,
   let jwtoken=req.clone({
      setHeaders:{
        Authorization: `bearer`+Auth.getToken(),
      }
    })
    return next.handle(jwtoken);
  }
  constructor(private injector:Injector) { }

}
