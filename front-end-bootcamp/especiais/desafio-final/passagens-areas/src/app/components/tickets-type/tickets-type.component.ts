import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tickets-type',
  templateUrl: './tickets-type.component.html',
  styleUrls: ['./tickets-type.component.scss'],
})
export class TicketsTypeComponent implements OnInit {
  public type: string = '1';
  
  @Output()
  public changed: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changedType() {
    this.changed.emit(this.type);
  }
}
