import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-toolbar',
  templateUrl: './summary-toolbar.component.html',
  styleUrls: ['./summary-toolbar.component.scss']
})
export class SummaryToolbarComponent implements OnInit {

  public items: number = 0;
  public finalValue: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
