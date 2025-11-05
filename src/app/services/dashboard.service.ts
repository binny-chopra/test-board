import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  private cache?: Observable<any>;

  getDashboardData(): Observable<any> {
    if (!this.cache) {
      console.log('Creating new cache...');
      const user$ = this.http.get('https://dummyjson.com/users/1');
      const products$ = this.http.get('https://dummyjson.com/products?limit=5');
      const news$ = this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=9258f42acbb1447aabf69bbe9fb216ff');

      this.cache = forkJoin({ user: user$, products: products$, news: news$ }).pipe(shareReplay(1))
    } else {
      console.log('Using cached observable');
    }
    return this.cache;
  }
}
