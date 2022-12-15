import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { IResponse } from "app/interfaces/response.interface";
import { catchError, exhaustMap, mergeMap, of, map, tap } from "rxjs";
import { AdminLoginSuccess, Login, LoginFailure,UserLoginSuccess, Signup, SignupFailure, SignupSuccess } from "../actions/auth.actions";
import { CommonService } from "app/common.service";
@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private commonService: CommonService
    ) {}

    logIn$ = createEffect(() => this.actions$.pipe(
        ofType(Login),
        mergeMap(({ request }) => this.authService.login(request)
            .pipe(
                map((response: IResponse) => {

                    this.commonService.setDetails(response.data.user);
                    
                    if(response.data.user.is_admin){
                        return AdminLoginSuccess({ response });
                    }else{
                        return UserLoginSuccess({ response });
                    }
                }),
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
                map((response: IResponse) => {
                    this.commonService.setDetails(response.data.user);
                    return SignupSuccess({ response });
                }),
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

    adminLoginComplete$ = createEffect(() => this.actions$.pipe(
        ofType(AdminLoginSuccess),
        tap(() => this.commonService.setAdmin()),
        tap(() => this.router.navigate(['admin']))
    ), { dispatch: false })

    userLoginCompleted$ = createEffect(() => this.actions$.pipe(
        ofType(UserLoginSuccess),
        tap(() => this.commonService.setUser()),
        tap(() => this.router.navigate(["/"]))
    ), { dispatch: false })

    signupSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(SignupSuccess),
        tap(() => this.commonService.setUser()),
        tap(() => alert("Please verify your email id by visiting the link sent to your mail.")),
        tap(() => this.router.navigate(["/user/login"]))
    ), { dispatch: false })

}