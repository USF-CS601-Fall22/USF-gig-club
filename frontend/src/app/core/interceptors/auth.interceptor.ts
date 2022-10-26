import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { merge, Observable, of } from 'rxjs';
import { first, flatMap, mergeMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';
import { authTokenSelector } from 'app/store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url);
    if (request.url.includes('classified')) {
      return this.store.select(authTokenSelector).pipe(
        first(),
        mergeMap(token => {
          const authReq = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(authReq);
        })
      )
    } else {
      return next.handle(request);
    }
  }
}
