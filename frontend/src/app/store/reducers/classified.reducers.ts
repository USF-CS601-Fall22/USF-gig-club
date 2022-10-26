import { createReducer, on } from "@ngrx/store"
import { FetchClassifiedsFailure, FetchClassifiedsSuccess } from "../actions/classified.actions"

export interface State {
    classifieds: any[],
    isLoading: boolean,
}

const initialState: State = {
    classifieds: [],
    isLoading: false
}

export const classifiedReducer = createReducer(
    initialState,
    on(FetchClassifiedsSuccess, (state, { response }) => ({...state, classifieds: response.data.classifieds, isLoading: false })),
    on(FetchClassifiedsFailure, (state, { response }) => ({...state, classifieds: response.data.classifieds, isLoading: false })),
)