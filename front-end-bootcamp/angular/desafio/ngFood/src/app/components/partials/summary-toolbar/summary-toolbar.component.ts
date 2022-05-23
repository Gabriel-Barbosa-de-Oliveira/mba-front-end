import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-summary-toolbar',
  templateUrl: './summary-toolbar.component.html',
  styleUrls: ['./summary-toolbar.component.scss']
})
export class SummaryToolbarComponent implements OnInit {

  @Input() items: number = 0;
  @Input() finalValue: number = 0;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

  public convertValueToCurrencyStandard(): string {
    return this.currencyService.convertoToSpecifiedCurrency(this.finalValue);
  }

}
