import { TestBed } from '@angular/core/testing';

import { CatsInfoService } from './cats-info.service';

describe('CatsInfoService', () => {
  let service: CatsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
