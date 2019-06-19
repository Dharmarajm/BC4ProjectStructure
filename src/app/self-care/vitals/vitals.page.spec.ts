import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsPage } from './vitals.page';

describe('VitalsPage', () => {
  let component: VitalsPage;
  let fixture: ComponentFixture<VitalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
