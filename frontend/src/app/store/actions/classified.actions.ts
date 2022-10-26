import { createAction, props } from "@ngrx/store";
import { ClassifiedRequest } from "app/interfaces/classifiedrequest.interface";
import { ClassifiedCreationRequest } from "app/interfaces/classifiedcreationrequest.interface";
import { IResponse } from "app/interfaces/response.interface";
import { ActionTypes } from "./actiontypes";


export const FetchClassifieds = createAction(ActionTypes.FETCH_CLASSIFIEDS, props<{ request: ClassifiedRequest }>());
export const FetchClassifiedsSuccess = createAction(ActionTypes.FETCH_CLASSIFIEDS_SUCCESS, props<{ response: IResponse }>());
export const FetchClassifiedsFailure = createAction(ActionTypes.FETCH_CLASSIFIEDS_FAILURE, props<{ response: IResponse }>());

export const CreateClassified = createAction(ActionTypes.CREATE_CLASSIFIED, props<{ request: ClassifiedCreationRequest }>());
export const CreateClassifiedSuccess = createAction(ActionTypes.CREATE_CLASSIFIED_SUCCESS, props<{ response: IResponse }>());
export const CreateClassifiedFailure = createAction(ActionTypes.CREATE_CLASSIFIED_FAILURE, props<{ response: IResponse }>());