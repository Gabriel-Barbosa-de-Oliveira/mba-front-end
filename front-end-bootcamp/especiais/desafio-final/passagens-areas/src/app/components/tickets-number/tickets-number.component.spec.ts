import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsNumberComponent } from './tickets-number.component';

describe('TicketsNumberComponent', () => {
  let component: TicketsNumberComponent;
  let fixture: ComponentFixture<TicketsNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
