import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassifiedRequest } from 'app/interfaces/classifiedrequest.interface';
import { FetchClassifieds } from 'app/store/actions/classified.actions';
import { AppState } from 'app/store/app.state';
import { classifiedsSelector } from 'app/store/selectors/classified.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-classified-listing',
  templateUrl: './classified-listing.component.html',
  styleUrls: ['./classified-listing.component.css']
})
export class ClassifiedListingComponent implements OnInit {

  classifieds$: Observable<any[]>;

  constructor(private store: Store<AppState>) { 
    this.classifieds$ = this.store.select(classifiedsSelector);
  }

  ngOnInit(): void {
    const request: ClassifiedRequest = {
      page: 1,
      size: 10
    };
    this.store.dispatch(FetchClassifieds({ request }));
  }

}
