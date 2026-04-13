import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../Models/Iproduct';
import { ICategory } from '../Models/Icategory';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
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














// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ProductsService } from '../Services/ProductService';
// import { IProduct } from '../Models/Iproduct';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product-detail.html',
//   styleUrl: './product-detail.scss',
// })
// export class ProductDetail implements OnInit {
//   product: IProduct | undefined;
//   isLoading = true;
//   errorMsg = '';

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private productsService: ProductsService
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.productsService.getProductByID(id).subscribe({
//       next: (data) => {
//         this.product = data;
//         this.isLoading = false;
//       },
//       error: () => {
//         this.errorMsg = 'Product not found.';
//         this.isLoading = false;
//       }
//     });
//   }

//   getImage(): string {
//     return this.product?.images?.[0]?.replace(/["\[\]]/g, '')
//       || 'https://placehold.co/300x200?text=No+Image';
//   }

//   goBack() {
//     this.router.navigate(['/products']);
//   }
// }