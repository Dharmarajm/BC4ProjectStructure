import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgvitalsPage } from './cgvitals.page';

describe('CgvitalsPage', () => {
  let component: CgvitalsPage;
  let fixture: ComponentFixture<CgvitalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgvitalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgvitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
