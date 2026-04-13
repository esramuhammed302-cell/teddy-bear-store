import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../Models/Iproduct';
import { ICategory } from '../Models/Icategory';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  imports: [RouterLink ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  @Input() product!: IProduct;
  @Input() categories!: ICategory[];
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
  getCategoryName(categoryID: number): string {
    const category = this.categories?.find((c) => c.ID === categoryID);
    return category ? category.Name : 'Unknown';
  }
}


