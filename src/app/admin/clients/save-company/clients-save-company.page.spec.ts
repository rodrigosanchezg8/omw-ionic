import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSaveCompanyPage } from './clients-save-company.page';

describe('ClientsSaveCompanyPage', () => {
  let component: ClientsSaveCompanyPage;
  let fixture: ComponentFixture<ClientsSaveCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsSaveCompanyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsSaveCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
