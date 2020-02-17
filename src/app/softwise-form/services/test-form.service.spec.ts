import { TestBed } from '@angular/core/testing';

import { TestFormService } from './test-form.service';

describe('TestFormService', () => {
  let service: TestFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
