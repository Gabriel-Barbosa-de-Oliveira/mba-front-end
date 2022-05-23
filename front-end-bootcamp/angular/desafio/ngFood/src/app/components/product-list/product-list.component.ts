import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  public products: any = {};
  Object = Object;

  constructor(private productService: ProductsService, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getProductsFromService();
    this.watchForProductRequest();
  }

  public getProductsFromService(): void {
    this.productService.getProducts();
  }

  public watchForProductRequest(){
    this.productService.formattedBackendList.subscribe(products => {
      this.products = products;
      console.log(this.products)
    })
  }

  public convertValueToCurrencyStandard(value: number){
    return this.currencyService.convertoToSpecifiedCurrency(value);
  }
}
