import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgdocVisitPage } from './cgdoc-visit.page';

describe('CgdocVisitPage', () => {
  let component: CgdocVisitPage;
  let fixture: ComponentFixture<CgdocVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgdocVisitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgdocVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
