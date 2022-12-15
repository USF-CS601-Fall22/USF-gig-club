import { createReducer, on } from "@ngrx/store";
import { User } from "app/models/user.model";
import { AdminLoginSuccess, LoginFailure, SignupFailure, SignupSuccess, UserLoginSuccess } from "../actions/auth.actions";

export interface State {
    isAuthenticated: boolean;
    user: User;
    is_admin: boolean;
}

const initialState: State = {
    isAuthenticated: false,
    user: {},
    is_admin: false,
};

export const authReducer = createReducer(
    initialState,
    on(UserLoginSuccess, (state, { response }) => ({...state, user: response.data, isAuthenticated: true })),
    on(AdminLoginSuccess, (state, { response }) => ({...state, user: response.data, isAuthenticated: true, is_admin: true})),
    
    on(LoginFailure, (state, { response }) => ({ ...state, user: response.data, isAuthenticated: false })),
    on(SignupSuccess, (state, { response }) => ({ ...state, user: response.data, isAuthenticated: true })),
    on(SignupFailure, (state, { response }) => ({ ...state, user: response.data, isAuthenticated: false })),
)
