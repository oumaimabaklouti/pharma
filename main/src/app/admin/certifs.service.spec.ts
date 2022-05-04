import { TestBed } from '@angular/core/testing';

import { CertifsService } from './certifs.service';

describe('CertifsService', () => {
  let service: CertifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
