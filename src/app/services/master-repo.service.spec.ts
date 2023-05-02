import { TestBed } from '@angular/core/testing';

import { MasterRepoService } from './master-repo.service';

describe('MasterRepoService', () => {
  let service: MasterRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
