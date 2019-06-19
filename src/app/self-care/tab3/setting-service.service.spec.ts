import { TestBed } from '@angular/core/testing';

import { SettingServiceService } from './setting-service.service';

describe('SettingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingServiceService = TestBed.get(SettingServiceService);
    expect(service).toBeTruthy();
  });
});
