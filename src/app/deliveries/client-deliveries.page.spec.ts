import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeliveriesPage } from './client-deliveries.page';

describe('ClientDeliveriesPage', () => {
  let component: ClientDeliveriesPage;
  let fixture: ComponentFixture<ClientDeliveriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDeliveriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeliveriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
