import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgalertsPage } from './cgalerts.page';

describe('CgalertsPage', () => {
  let component: CgalertsPage;
  let fixture: ComponentFixture<CgalertsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgalertsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgalertsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
