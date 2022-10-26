import { TestBed } from '@angular/core/testing';

import { ClassifiedService } from './classified.service';

describe('ClassifiedService', () => {
  let service: ClassifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
