import { TestBed } from '@angular/core/testing';

import { SelfCareServicesService } from './self-care-services.service';

describe('SelfCareServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelfCareServicesService = TestBed.get(SelfCareServicesService);
    expect(service).toBeTruthy();
  });
});
