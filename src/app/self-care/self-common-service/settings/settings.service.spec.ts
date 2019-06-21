import { TestBed } from '@angular/core/testing';

import { SelfCareServiceService } from './self-care-service.service';

describe('SelfCareServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelfCareServiceService = TestBed.get(SelfCareServiceService);
    expect(service).toBeTruthy();
  });
});
