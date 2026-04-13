import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
interface PlatziProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-products.html',
  styleUrl: './search-products.scss',
})
export class SearchProducts implements OnInit {
  searchQuery: string = '';
  allProducts: PlatziProduct[] = [];
  results: PlatziProduct[] = [];
  isLoading: boolean = false;
  error: string = '';
  searched: boolean = false;
  private timeout: any;

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.loadAllProducts();
  }

  async loadAllProducts() {
    this.isLoading = true;
    this.error = '';
    if (this.allProducts.length > 0) {
      this.toastr.success('Search completed', `Found ${this.allProducts.length} products`);
    }

    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await res.json();

      this.allProducts = data;
      this.results = data;

      console.log('Total Products Loaded:', this.allProducts.length);

      this.searched = true;
    } catch (err) {
      this.error = 'Failed to load products from API';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  onSearchChange() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchProducts();
    }, 300);
  }

  searchProducts() {
    const keyword = this.searchQuery.toLowerCase().trim();
    if (!keyword) {
      this.results = this.allProducts;
      return;
    }
    this.results = this.allProducts.filter((p) => p.title.toLowerCase().includes(keyword));
  }

  getImage(product: PlatziProduct): string {
    if (!product.images || product.images.length === 0) {
      return 'https://placehold.co/300x200?text=No+Image';
    }

    let rawImg = product.images[0];
    const cleanImg = rawImg.replace(/[\[\]"\\]/g, '');

    return cleanImg.startsWith('http') ? cleanImg : 'https://placehold.co/300x200?text=Invalid+URL';
  }
}
