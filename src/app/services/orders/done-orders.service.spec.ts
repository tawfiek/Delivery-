import { TestBed } from '@angular/core/testing';

import { DoneOrdersService } from './done-orders.service';

describe('DoneOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoneOrdersService = TestBed.get(DoneOrdersService);
    expect(service).toBeTruthy();
  });
});
