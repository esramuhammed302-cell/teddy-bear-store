import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../Services/ProductService';
@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-details-page.html',
})
export class ProductDetailsPage {
  product!: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getProductByID(id);

    if (found) {
      this.product = found;
    }
  }
}
