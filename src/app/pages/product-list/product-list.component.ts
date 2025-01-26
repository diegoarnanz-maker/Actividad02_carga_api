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
  arrProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  //Forma antigua
  // constructor(private productService: ProductServiceService) { }

  productService = inject(ProductServiceService);

  async ngOnInit(): Promise<void> {
    try {
      this.arrProducts = await this.productService.getProducts();
      this.filteredProducts = [...this.arrProducts];
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  onDeleteProduct(id: string): void {
    this.productService.deleteProduct(id);
    this.arrProducts = this.arrProducts.filter((product) => product._id !== id);
    this.filteredProducts = this.productService.filterProducts({
      nombre: '',
      categoria: '',
      precioMin: undefined,
      precioMax: undefined,
      activo: undefined,
    });
  }
  
  applyFilters(filters: any): void {
    console.log('Filtros aplicados:', filters);
    if (Object.keys(filters).length === 0) {
      this.filteredProducts = [...this.arrProducts];
    } else {
      this.filteredProducts = this.productService.filterProducts(filters);
    }
    console.log('Productos filtrados:', this.filteredProducts);
  }
}
