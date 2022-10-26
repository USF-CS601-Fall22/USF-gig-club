import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassifiedComponent } from './create-classified.component';

describe('CreateClassifiedComponent', () => {
  let component: CreateClassifiedComponent;
  let fixture: ComponentFixture<CreateClassifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClassifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClassifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
