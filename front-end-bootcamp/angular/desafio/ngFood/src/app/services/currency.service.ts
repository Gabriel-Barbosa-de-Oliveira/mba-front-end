import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  public convertoToSpecifiedCurrency(value: number): string {
    return new Intl.NumberFormat('BRL', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
}
