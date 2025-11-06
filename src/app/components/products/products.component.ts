import { Component, OnInit } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(public store: ProductStoreService) { }
  ngOnInit() {
    this.store.loadProducts();
  }
  trackById(index: number, item: any) {
    return item.id;
  }

}
