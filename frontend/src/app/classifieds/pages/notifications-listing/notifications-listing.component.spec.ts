import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsListingComponent } from './notifications-listing.component';

describe('NotificationsListingComponent', () => {
  let component: NotificationsListingComponent;
  let fixture: ComponentFixture<NotificationsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
