import { TestBed } from '@angular/core/testing';

import { TimelyService } from './timely.service';

describe('TimelyService', () => {
  let service: TimelyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
