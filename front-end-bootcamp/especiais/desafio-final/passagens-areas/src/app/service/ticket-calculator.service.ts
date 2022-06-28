import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicketCalculatorService {
  EARTH_RADIUS = 6_371.071; // Earth

  constructor() {}

  public getDistance(
    originLatitude: number,
    originLongitude: number,
    destinationLatitude: number,
    destinationLongitude: number
  ) {
    const diffLatitudeRadians = this.degreesToRadians(
      destinationLatitude - originLatitude
    );
    const diffLongitudeRadians = this.degreesToRadians(
      destinationLongitude - originLongitude
    );
    const originLatitudeRadians = this.degreesToRadians(originLatitude);
    const destinationLatitudeRadians =
      this.degreesToRadians(destinationLatitude);
    const kmDistance =
      2 *
      this.EARTH_RADIUS *
      Math.asin(
        Math.sqrt(
          Math.sin(diffLatitudeRadians / 2) *
            Math.sin(diffLatitudeRadians / 2) +
            Math.cos(originLatitudeRadians) *
              Math.cos(destinationLatitudeRadians) *
              Math.sin(diffLongitudeRadians / 2) *
              Math.sin(diffLongitudeRadians / 2)
        )
      );
    return kmDistance;
  }

  private degreesToRadians(degrees: number) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  public getAdultsTicketTotal(
    originCountryName: string,
    destinationCountryName: string,
    distance: number,
    type: string,
    isChild: boolean,
    miles: number
  ) {
    let total: number = 0;
    if (
      this.checkIfCountryIsTheSame(originCountryName, destinationCountryName)
    ) {
      if (!isChild) {
        total = distance * 0.3;
      } else {
        total = distance * 0.15;
      }
    } else {
      if (!isChild) {
        total = distance * 0.5;
      } else {
        total = distance * 0.25;
      }
    }

    if (type.toLocaleLowerCase() === 'executiva') {
      if (!isChild) {
        total = total * 1.8;
      } else {
        total = total * 1.4;
      }
    }

    return total;
  }

  private checkIfCountryIsTheSame(
    originCountryName: string,
    destinationCountryName: string
  ) {
    return originCountryName === destinationCountryName;
  }
}
