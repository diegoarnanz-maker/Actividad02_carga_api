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
  filters: any = {
    nombre: '',
    categoria: '',
    precioMin: undefined,
    precioMax: undefined,
    activo: undefined,
  };

  errorPrecio: boolean = false;

  constructor() {}

  ngOnChanges(): void {
    console.log('Productos recibidos en el filtro:', this.products);
    this.extractCategories();
  }

  extractCategories(): void {
    this.categories = [
      ...new Set(this.products.map((product) => product.category)),
    ];
  }

  applyFilters(filterForm: NgForm): void {
    const values = { ...filterForm.value };

    // if (values.precioMin && values.precioMax && values.precioMax < values.precioMin) {
    //   alert('El precio máximo no puede ser menor que el precio mínimo.');
    //   return;
    // }

    if (values.activo === 'true') {
      values.activo = true;
    } else if (values.activo === 'false') {
      values.activo = false;
    } else {
      values.activo = undefined;
    }

    this.filtersChanged.emit(values);
  }

  checkPriceRange(min: number, max: number): void {
    const minValue = +min || undefined;
    const maxValue = +max || undefined;

    if (
      minValue !== undefined &&
      maxValue !== undefined &&
      maxValue < minValue
    ) {
      this.errorPrecio = true;
    } else {
      this.errorPrecio = false;
    }
  }

  clearFilters(form: NgForm): void {
    form.resetForm();
    this.filtersChanged.emit({});
  }
}
