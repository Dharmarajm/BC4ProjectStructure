import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVisitsPage } from './doc-visits.page';

describe('DocVisitsPage', () => {
  let component: DocVisitsPage;
  let fixture: ComponentFixture<DocVisitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocVisitsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVisitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
