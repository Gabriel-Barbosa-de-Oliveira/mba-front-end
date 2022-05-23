import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public formattedBackendList: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private backendService: BackendService) {}

  public getProducts(): void {
    this.backendService.getFoodList().subscribe(
      (products) => {
        this.products.next(products);
        this.formattedBackendList.next(_.groupBy(products, 'categoria'));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
