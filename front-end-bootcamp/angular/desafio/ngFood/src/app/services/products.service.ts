import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';
import * as _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private checkoutProducts: Array<any> = [];
  public products: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public formattedBackendList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public checkoutList: BehaviorSubject<any> = new BehaviorSubject<any>(this.checkoutProducts);

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

  public setNewProduct(product: any){
    const newProduct = {...product, quantity: 1};
    const index = this.checkoutProducts.findIndex(checkoutProduct => product.id === checkoutProduct.id);
    if(index === -1){
      this.checkoutProducts.push(newProduct);
    }else{
      this.checkoutProducts[index].quantity++;
    }
    this.checkoutList.next(this.checkoutProducts);
  }

  public deleteAllProducts(){
    this.checkoutProducts = [];
    this.checkoutList.next(this.checkoutProducts);
  }
}
