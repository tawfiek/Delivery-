import { TestBed } from '@angular/core/testing';

import { NewOrdersService } from './new-orders.service';

describe('NewOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewOrdersService = TestBed.get(NewOrdersService);
    expect(service).toBeTruthy();
  });
});
