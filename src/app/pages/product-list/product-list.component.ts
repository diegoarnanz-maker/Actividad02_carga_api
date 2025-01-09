import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  //Forma antigua
  // constructor(private productService: ProductServiceService) { }

  productService = inject(ProductServiceService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getProducts()
      .then((products) => {
        this.products = products;
      })
      .catch((error) => {
        console.error('Error en getProducts:', error);
      });
  }

  onDeleteProduct(id: string): void {
    this.productService.deleteProduct(id);
    this.products = this.productService.getArrLocal();
  }
  
}
