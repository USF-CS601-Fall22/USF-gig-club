import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';
import { isAuthenticatedSelector } from 'app/store/selectors/auth.selectors';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(isAuthenticatedSelector),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          return this.route.navigateByUrl('/user/login');
        }
        return isAuthenticated;
      })
    )
  }
  
}
