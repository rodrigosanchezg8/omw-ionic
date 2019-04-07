import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMenSaveOptionsPage } from './delivery-men-save-options.page';

describe('DeliveryMansSaveOptionsPage', () => {
  let component: DeliveryMenSaveOptionsPage;
  let fixture: ComponentFixture<DeliveryMenSaveOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryMenSaveOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryMenSaveOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
