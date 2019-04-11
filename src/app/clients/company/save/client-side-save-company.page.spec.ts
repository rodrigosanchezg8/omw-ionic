import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSideSaveCompanyPage } from './client-side-save-company.page';

describe('ClientSideSaveCompanyPage', () => {
  let component: ClientSideSaveCompanyPage;
  let fixture: ComponentFixture<ClientSideSaveCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSideSaveCompanyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSideSaveCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
