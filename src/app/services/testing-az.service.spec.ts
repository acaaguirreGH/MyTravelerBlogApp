import { TestBed } from '@angular/core/testing';

import { TestingAZService } from './testing-az.service';

describe('TestingAZService', () => {
  let service: TestingAZService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestingAZService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
