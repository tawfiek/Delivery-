import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersToDeliverPage } from './orders-to-deliver.page';

describe('OrdersToDeliverPage', () => {
  let component: OrdersToDeliverPage;
  let fixture: ComponentFixture<OrdersToDeliverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersToDeliverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersToDeliverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
