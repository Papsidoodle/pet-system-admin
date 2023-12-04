import { TestBed } from '@angular/core/testing';

import { DogsInfoService } from './dogs-info.service';

describe('DogsInfoService', () => {
  let service: DogsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
