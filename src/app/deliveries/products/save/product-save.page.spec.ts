import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSavePage } from './product-save.page';

describe('ProductSavePage', () => {
  let component: ProductSavePage;
  let fixture: ComponentFixture<ProductSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
