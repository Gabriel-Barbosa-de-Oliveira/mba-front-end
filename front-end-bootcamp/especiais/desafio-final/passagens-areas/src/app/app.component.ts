import { Component } from '@angular/core';
import { BackendService } from './service/backend.service';
import { TicketCalculatorService } from './service/ticket-calculator.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public countries: Array<any> = [];
  public originCountry: any;
  public destinationCountry: any;
  public originCity: any;
  public destinationCity: any;
  public distance: any;
  public adultsNumber: number = 1;
  public childrenNumber: number = 0;
  public type: string = 'Econômica';
  public miles: number = 0;
  public totalAdults: number = 0;
  public totalChildren: number = 0;
  public total: number = 0;

  constructor(
    private backendService: BackendService,
    private ticketCalculator: TicketCalculatorService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  private getCountries(): void {
    this.backendService.getDataFromBackend().subscribe((countries) => {
      this.countries = countries;
    });
  }

  public mapOriginCountry(country: any) {
    this.originCountry = country;
  }

  public mapDestinationCountry(country: any) {
    this.destinationCountry = country;
  }

  public mapOriginCity(city: any) {
    this.originCity = city;
  }

  public mapDestinationCity(city: any) {
    this.destinationCity = city;
  }

  public mapAdultsNumber(adults: number) {
    this.adultsNumber = adults;
  }

  public mapChildrenNumber(children: number) {
    this.childrenNumber = children;
  }

  public mapType(type: string) {
    if (type === '1') {
      this.type = 'Econômica';
    } else {
      this.type = 'Executiva';
    }
  }

  public mapMiles(miles: number){
    this.miles = miles
  } 

  public getTicketSummary(): void {
    this.distance = this.ticketCalculator
      .getDistance(
        this.originCity.latitude,
        this.originCity.longitude,
        this.destinationCity.latitude,
        this.destinationCity.longitude
      )
      .toFixed(1);

    this.totalAdults = _.round(this.ticketCalculator.getAdultsTicketTotal(this.originCountry, this.destinationCountry, this.distance, this.type, false, this.miles), 2);
    this.totalAdults > 0 ? this.totalAdults : 0;
    this.totalChildren = _.round(this.ticketCalculator.getAdultsTicketTotal(this.originCountry, this.destinationCountry, this.distance, this.type, true, this.miles), 2);
    this.totalChildren > 0 ? this.totalChildren : 0;
    this.total = _.round((this.totalAdults * this.adultsNumber) + (this.totalChildren * this.childrenNumber) - (this.miles * 0.02), 2)  ;
  }
}
