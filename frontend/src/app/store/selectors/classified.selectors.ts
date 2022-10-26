import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers/classified.reducers";

const classifiedSelector = createFeatureSelector<State>('classified');

export const classifiedsSelector = createSelector(classifiedSelector, state => state.classifieds);