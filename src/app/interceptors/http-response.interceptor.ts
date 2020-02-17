import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        tap(
          () => {},
          ({ status, error}) => {
            if (status === 500 && error?.error?.msg) {
              alert(error.error.msg + '\n\r Try again letter'); // TODO: use snackbar or another popup
            }
          }
        )
      );
  }
}
