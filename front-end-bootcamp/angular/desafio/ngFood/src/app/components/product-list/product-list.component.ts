import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProductsService } from 'src/app/services/products.service';
import * as _ from "lodash";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public products: any = {};
  public items: number = 0;
  public totalValue: number = 0;
  Object = Object;

  constructor(
    private productService: ProductsService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.getProductsFromService();
    this.watchForProductRequest();
    this.watchProductQuantity();
  }

  public getProductsFromService(): void {
    this.productService.getProducts();
  }

  public watchForProductRequest() {
    this.productService.formattedBackendList.subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }

  public watchProductQuantity(){
    this.productService.checkoutList.subscribe((products: Array<any>) => {
      this.items = _.sumBy(products, 'quantity');
      this.totalValue = _.sumBy(products, function(product) { return product.quantity * product.preco; })
    });
  }


  public convertValueToCurrencyStandard(value: number) {
    return this.currencyService.convertoToSpecifiedCurrency(value);
  }

  public setNewProduct(product: any) {
    this.productService.setNewProduct(product);
  }
}
