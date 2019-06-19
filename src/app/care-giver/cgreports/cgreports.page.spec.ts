import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgreportsPage } from './cgreports.page';

describe('CgreportsPage', () => {
  let component: CgreportsPage;
  let fixture: ComponentFixture<CgreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgreportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
