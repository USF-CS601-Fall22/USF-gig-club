import { createReducer, on } from "@ngrx/store";
import { User } from "app/models/user.model";
import { LoginFailure, LoginSuccess, SignupFailure, SignupSuccess } from "../actions/auth.actions";

export interface State {
    isAuthenticated: boolean;
    user: User;
}

const initialState: State = {
    isAuthenticated: false,
    user: {},
};

export const authReducer = createReducer(
    initialState,
    on(LoginSuccess, (state, { response }) => ({...state, user: response.data, isAuthenticated: true })),
    on(LoginFailure, (state, { response }) => ({ ...state, user: response.data, isAuthenticated: false })),
    on(SignupSuccess, (state, { response }) => ({ ...state, user: response.data, isAuthenticated: true })),
    on(SignupFailure, (state, { response }) => ({ ...state, user: response.data, isAuthenticated: false })),
)
