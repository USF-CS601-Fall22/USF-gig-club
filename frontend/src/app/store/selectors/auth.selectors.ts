import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { State } from "../reducers/auth.reducers";

const authSelector = createFeatureSelector<State>('auth');

export const isAuthenticatedSelector = createSelector(authSelector, state => state.isAuthenticated);
export const authTokenSelector = createSelector(authSelector, state => state.user.token);