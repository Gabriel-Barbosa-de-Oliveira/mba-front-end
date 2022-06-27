import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  @Input() countries: Array<any> = [];
  @Input() label: 'Origem' | 'Destino' = 'Origem';
  @Output() country: EventEmitter<string> = new EventEmitter();
  @Output() city: EventEmitter<any> = new EventEmitter();

  public selectedCountry: any = null;
  public selectedCity: any = null;

  constructor() {}

  ngOnInit(): void {}

  public countryChanged(): void {
    this.selectedCity = {};
  }

  public emitChanges(): void {
    this.country.emit(this.selectedCountry.country);
    this.city.emit(this.selectedCity);
  }
}
