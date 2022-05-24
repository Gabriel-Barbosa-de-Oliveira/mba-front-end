import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProductsService } from 'src/app/services/products.service';
import * as _ from "lodash";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public title: string = 'Pedido';
  public products: Array<any> = [];
  public items: number = 0;
  public totalValue: number = 0;

  constructor(
    private productService: ProductsService,
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.watchCheckoutProductQuantity();
  }

  public watchCheckoutProductQuantity(): void {
    this.productService.checkoutList.subscribe((products: Array<any>) => {
      this.products = products;
      this.items = _.sumBy(products, 'quantity');
      this.totalValue = _.sumBy(products, function(product) { return product.quantity * product.preco; })
    });
  }

  public convertValueToCurrencyStandard(value: number): string {
    return this.currencyService.convertoToSpecifiedCurrency(value);
  }

  public returnToCardapio(): void {
    this.router.navigate(['/cardapio']);
  }

  public deleteAllProducts(){
    this.productService.deleteAllProducts();
  }
}
