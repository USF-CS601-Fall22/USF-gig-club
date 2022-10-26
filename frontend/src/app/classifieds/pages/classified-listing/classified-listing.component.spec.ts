import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedListingComponent } from './classified-listing.component';

describe('ClassifiedListingComponent', () => {
  let component: ClassifiedListingComponent;
  let fixture: ComponentFixture<ClassifiedListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifiedListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassifiedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
