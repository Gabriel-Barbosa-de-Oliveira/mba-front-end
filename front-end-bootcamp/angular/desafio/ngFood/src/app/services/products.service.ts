import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';
import * as _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

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
        const formattedProducts = this.mapProductId(products)
        this.products.next(formattedProducts);
        this.formattedBackendList.next(_.groupBy(formattedProducts, 'categoria'));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private mapProductId(products: Array<any>): Array<any>{
    return products.map(product => {
      return ({ ...product, id: uuidv4() })
    });
  }
}
