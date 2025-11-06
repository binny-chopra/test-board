import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  private products = signal<any[]>([]);
  private filter = signal<string>('');
  filteredProducts = computed(() => {
    const all = this.products();
    const f = this.filter();
    return f ? all.filter(p => p.category === f) : all;
  })

  constructor(private http: HttpClient) { }

  loadProducts() {
    console.log('Cache length:', this.products().length);
    if (this.products().length === 0) {
      console.log('Cache MISS → Fetching from API');
      this.http.get<any>('https://dummyjson.com/products?limit=10')
        .subscribe(res => {
          console.log('API response received');
          this.products.set(res.products);
        });
    } else {
      console.log('Cache HIT → Using in-memory data');
    }
  }

  setFilter(category: string) {
    this.filter.set(category);
  }


}
