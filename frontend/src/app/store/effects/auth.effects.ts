import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { IResponse } from "app/interfaces/response.interface";
import { catchError, exhaustMap, mergeMap, of, map, tap } from "rxjs";
import { Login, LoginFailure, LoginSuccess, Signup, SignupFailure, SignupSuccess } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    logIn$ = createEffect(() => this.actions$.pipe(
        ofType(Login),
        mergeMap(({ request }) => this.authService.login(request)
            .pipe(
                map((response: IResponse) => LoginSuccess({ response })),
                catchError((err) => {
                    let response: IResponse = {
                        message: "",
                        data: err.message,
                    }
                    console.log(err);
                    
                    if(err.status == 403){
                        alert("Email id not verified. Please verify by visiting the link sent to your mail.")
                    }else{
                        alert("Invalid credentials")
                    }
                    

                    return of(LoginFailure({ response }));
                })
            )
        )
    ));

    signUp$ = createEffect(() => this.actions$.pipe(
        ofType(Signup),
        mergeMap(({ request }) => this.authService.signup(request)
            .pipe(
                map((response: IResponse) => SignupSuccess({ response })),
                catchError((err) => {
                    let response: IResponse = {
                        message: "",
                        data: err.message,
                    }
                    return of(SignupFailure({ response }));
                })
            )
        )
    ));

    loginComplete$ = createEffect(() => this.actions$.pipe(
        ofType(LoginSuccess),
        tap(() => this.router.navigate(['/']))
    ), { dispatch: false })
}