import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Environment } from 'src/environments/environment.interface';
import { ENVIRONMENT } from './environment.token';

@Injectable()
export class UrlInterceptor<T> implements HttpInterceptor {
  constructor(@Inject(ENVIRONMENT) private environment: Environment) {}

  intercept(req: HttpRequest<T>, next: HttpHandler) {
    const newReqApiUrl = req.clone({ url: this.environment.apiUrl + req.url });

    if (req.headers.has('skipToken')) {
      const newReq = newReqApiUrl.clone({
        headers: req.headers.delete('skipToken'),
      });
      return next.handle(newReq);
    } else {
      let headers = new HttpHeaders();
      let token = localStorage.getItem('user_token_adopet');
      headers = headers.set('Authorization', 'Bearer ' + token);

      const newReq = newReqApiUrl.clone({ headers });
      return next.handle(newReq);
    }
  }
}
