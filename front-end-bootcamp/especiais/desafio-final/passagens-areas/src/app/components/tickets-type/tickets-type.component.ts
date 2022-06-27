import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets-type',
  templateUrl: './tickets-type.component.html',
  styleUrls: ['./tickets-type.component.scss'],
})
export class TicketsTypeComponent implements OnInit {
  public type: string = '1';

  constructor() {}

  ngOnInit(): void {}

  changedType() {}
}
