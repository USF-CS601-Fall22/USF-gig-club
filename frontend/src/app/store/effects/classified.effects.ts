import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClassifiedService } from "app/classifieds/services/classified.service";
import { IResponse } from "app/interfaces/response.interface";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { CreateClassified, CreateClassifiedFailure, CreateClassifiedSuccess, FetchClassifieds, FetchClassifiedsFailure, FetchClassifiedsSuccess } from "../actions/classified.actions";

@Injectable()
export class ClassifiedEffects {
    constructor(
        private actions$: Actions,
        private classifiedService: ClassifiedService,
        private router: Router,
    ) {}

   fetchClassifieds$ = createEffect(() => this.actions$.pipe(
        ofType(FetchClassifieds),
        mergeMap(({ request }) => this.classifiedService.fetchClassifieds(request)
            .pipe(
                map((response: IResponse) => FetchClassifiedsSuccess({ response })),
                catchError((err) => {
                    let response: IResponse = {
                        message: "",
                        data: err.message,
                    }
                    return of(FetchClassifiedsFailure({ response }));
                })
            )
        )
   ));

   createClassified$ = createEffect(() => this.actions$.pipe(
    ofType(CreateClassified),
    mergeMap(({ request }) => this.classifiedService.createClassified(request)
        .pipe(
            map((response: IResponse) => CreateClassifiedSuccess({ response })),
            catchError((err) => {
                let response: IResponse = {
                    message: "",
                    data: err.message,
                }
                return of(CreateClassifiedFailure({ response }));
            })
        )
    )
   ))

   creationComplete$ = createEffect(() => this.actions$.pipe(
        ofType(CreateClassifiedSuccess),
        tap(() => this.router.navigate(['/']))
    ), { dispatch: false })
}