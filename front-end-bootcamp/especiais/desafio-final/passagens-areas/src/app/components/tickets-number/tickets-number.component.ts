import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tickets-number',
  templateUrl: './tickets-number.component.html',
  styleUrls: ['./tickets-number.component.scss'],
})
export class TicketsNumberComponent implements OnInit {
  @Input() label: 'Adulto' | 'Criança' = 'Adulto';

  public ticketNumber: number = 0;

  @Output()
  public changedTickedNumber: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.label == 'Adulto') this.ticketNumber++;
  }

  addTicket() {
    this.ticketNumber++;
    this.changedTickedNumber.emit(this.ticketNumber);
  }

  removeTicket() {
    if (this.label == 'Adulto') {
      if (this.ticketNumber > 1) {
        this.ticketNumber--;
      }
    } else {
      if (this.ticketNumber > 0) {
        this.ticketNumber--;
      }
    }
    this.changedTickedNumber.emit(this.ticketNumber);
  }
}
