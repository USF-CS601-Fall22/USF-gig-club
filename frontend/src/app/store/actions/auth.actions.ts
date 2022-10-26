import { Action, createAction, props } from "@ngrx/store";
import { LoginRequest } from "app/interfaces/loginrequest.interface";
import { IResponse } from "app/interfaces/response.interface";
import { SignupRequest } from "app/interfaces/signuprequest.interface";
import { ActionTypes } from "./actiontypes";


export const Login = createAction(ActionTypes.LOGIN, props<{ request: LoginRequest }>());
export const LoginSuccess = createAction(ActionTypes.LOGIN_SUCCESS, props<{ response: IResponse }>());
export const LoginFailure = createAction(ActionTypes.LOGIN_FAILURE, props<{ response: IResponse }>());
export const Signup = createAction(ActionTypes.SIGNUP, props<{ request: SignupRequest }>());
export const SignupSuccess = createAction(ActionTypes.SIGNUP_SUCCESS, props<{ response: IResponse }>());
export const SignupFailure = createAction(ActionTypes.SIGNUP_FAILURE, props<{ response: IResponse }>());
