import { Component, Input } from '@angular/core';
import { Store } from '../Models/Store';
import { IProduct } from '../Models/Iproduct';
import { ICategory } from '../Models/Icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../shared/directives/product-card';
import { CreditCardPipe } from '../shared/pipes/credit-card-pipe';
import { ProductDetail } from '../product-detail/product-detail';
import { ProductsService } from '../Services/ProductService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductCard, CreditCardPipe, ProductDetail, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

  // store: Store = new Store(
  //   'TEDDY BEAR',
  //   ['Branch 1', 'Branch 2'],
  //   'https://marketplace.canva.com/EAGHsTZXQPs/1/0/1600w/canva-pink-brown-cute-circle-cake-and-dessert-logo-6C6QBzXYqss.jpg',
  // );

  // StoreOwner: string = 'Esraa';


  categories: ICategory[] = [
    { ID: 1, Name: 'Chocolate' },
    { ID: 2, Name: 'Strawberry' },
  ];

  selectedCategoryID: number = 0;

  searchText: string = '';

  productList: IProduct[] = [];

  selectedProduct: IProduct | null = null;
  constructor(private productsService: ProductsService) {
    this.productList = this.productsService.getAllProducts();
  }

  buy(product: IProduct) {
    this.productsService.buy(product);
  }

  showDetails(product: IProduct) {
    this.selectedProduct = product;
  }

  closeDetails() {
    this.selectedProduct = null;
  }

  get filteredProducts() {
    return this.productList.filter(
      (p) =>
        p.Name.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.selectedCategoryID == 0 || p.CategoryID === Number(this.selectedCategoryID)),
    );
  }

  currentDate: Date = new Date();
}

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { IProduct } from '../Models/Iproduct';
// import { ProductsService } from '../Services/ProductService';
// import { CreditCardPipe } from '../shared/pipes/credit-card-pipe';
// import { ProductCard } from '../shared/directives/product-card';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink, CreditCardPipe, ProductCard],
//   templateUrl: './products.html',
//   styleUrl: './products.scss',
// })
// export class Products implements OnInit {

//   productList: IProduct[] = [];
//   filteredList: IProduct[] = [];
//   searchText: string = '';
//   isLoading = true;
//   errorMsg = '';
//   currentDate = new Date();

//   constructor(private productsService: ProductsService) {}

//   ngOnInit(): void {
//     this.productsService.getAllProducts().subscribe({
//       next: (data) => {
//         this.productList = data;
//         this.filteredList = data;
//         this.isLoading = false;
//       },
//       error: () => {
//         this.errorMsg = 'Failed to load products. Please try again.';
//         this.isLoading = false;
//       }
//     });
//   }

//   onSearch(): void {
//     const keyword = this.searchText.toLowerCase();
//     this.filteredList = this.productList.filter(p =>
//       p.title.toLowerCase().includes(keyword)
//     );
//   }

//   getImage(product: IProduct): string {
//     return product.images?.[0]?.replace(/["\[\]]/g, '')
//       || 'https://placehold.co/300x200?text=No+Image';
//   }
// }