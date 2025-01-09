import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  @Input() products: IProduct[] = [];
  @Output() filtersChanged = new EventEmitter<any>();
  categories: string[] = [];

  constructor() {}

  ngOnChanges(): void {
    this.extractCategories();
  }

  extractCategories(): void {
    this.categories = [...new Set(this.products.map((product) => product.category))];
  }

  applyFilters(filterForm: NgForm): void {
    this.filtersChanged.emit(filterForm.value);
    console.log(filterForm.value);
  }

  clearFilters(form: NgForm): void {
    form.resetForm(); // Limpia los valores del formulario
    this.filtersChanged.emit({}); // Enviar un filtro vacío
  }
  
}
