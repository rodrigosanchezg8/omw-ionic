import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeliveryChooseOriginPage } from './client-delivery-choose-origin.page';

describe('ClientDeliveryChooseOriginPage', () => {
  let component: ClientDeliveryChooseOriginPage;
  let fixture: ComponentFixture<ClientDeliveryChooseOriginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDeliveryChooseOriginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeliveryChooseOriginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
