import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSavePage } from './users-save.page';

describe('ClientsSavePage', () => {
  let component: UsersSavePage;
  let fixture: ComponentFixture<UsersSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
