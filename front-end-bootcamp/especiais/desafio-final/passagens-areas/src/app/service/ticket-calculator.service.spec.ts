import { TestBed } from '@angular/core/testing';

import { TicketCalculatorService } from './ticket-calculator.service';

describe('TicketCalculatorService', () => {
  let service: TicketCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
