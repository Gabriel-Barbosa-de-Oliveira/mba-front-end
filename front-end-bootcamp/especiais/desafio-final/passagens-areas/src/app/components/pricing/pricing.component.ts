import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  @Input() countries: Array<any> = [];
  @Input() label: 'Origem' | 'Destino' = 'Origem';
  public selectedCountry: any = null;
  public selectedCity: any = null;

  constructor() {}

  ngOnInit(): void {}

  public countryChanged(): void {
    this.selectedCity = {};
  }
}
