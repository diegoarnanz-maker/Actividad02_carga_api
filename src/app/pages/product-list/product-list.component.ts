import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

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
        this.filteredProducts = [...products];
      })
      .catch((error) => {
        console.error('Error en getProducts:', error);
      });
  }

  onDeleteProduct(id: string): void {
    this.productService.deleteProduct(id);
    this.products = this.productService.getArrLocal();
    this.filteredProducts = this.productService.filterProducts({});
  }

  applyFilters(filters: any): void {
    console.log('Filtros aplicados:', filters);
    if (Object.keys(filters).length === 0) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.productService.filterProducts(filters);
    }
    console.log('Productos filtrados:', this.filteredProducts);
  }
}
