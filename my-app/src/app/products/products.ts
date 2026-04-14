import { Component, Input } from '@angular/core';
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


  // categories: ICategory[] = [
  //   { ID: 1, Name: 'Chocolate' },
  //   { ID: 2, Name: 'Strawberry' },
  // ];

  selectedCategoryID: number = 0;

  searchText: string = '';

  productList: IProduct[] = [];
  categories: ICategory[] = [];

  selectedProduct: IProduct | null = null;
  constructor(private productsService: ProductsService ) {
    this.productList = this.productsService.getAllProducts();
    this.categories = this.productsService.getAllCategories();
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

