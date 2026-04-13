import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  imports: [CommonModule, FormsModule ],
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

  private searchSubject = new Subject<string>();

  constructor(
    private toastr: ToastrService,
    private http: HttpClient   
  ) {}

  ngOnInit() {
    this.loadAllProducts();

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.searchProducts();
    });
  }

  loadAllProducts() {
    this.isLoading = true;
    this.error = '';

    this.http.get<PlatziProduct[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe({
        next: (data) => {
          this.allProducts = data;
          this.results = data;
          this.searched = true;

          this.toastr.success(`Found ${data.length} products`);
        },
        error: () => {
          this.error = 'Failed to load products from API';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  searchProducts() {
    const keyword = this.searchQuery.toLowerCase().trim();

    if (!keyword) {
      this.results = this.allProducts;
      return;
    }

    this.results = this.allProducts.filter(p =>
      p.title.toLowerCase().includes(keyword)
    );
  }

  trackById(index: number, item: PlatziProduct) {
    return item.id;
  }

  getImage(product: PlatziProduct): string {
    return product.images?.[0]?.replace(/[\[\]"\\]/g, '')
      || 'https://placehold.co/300x200?text=No+Image';
  }

  
}