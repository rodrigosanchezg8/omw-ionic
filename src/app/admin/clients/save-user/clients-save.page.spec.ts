import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSavePage } from './clients-save.page';

describe('ClientsSavePage', () => {
  let component: ClientsSavePage;
  let fixture: ComponentFixture<ClientsSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
