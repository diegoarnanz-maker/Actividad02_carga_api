import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  //Recibe un producto del componente padre
  @Input() product: IProduct = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    active: false
  };

  //Se podria poner asi porque sabemos que se va a inicializar antes de usarlo
  // @Input() product!: IProduct;

  //Envia un evento al componente padre
  @Output() deleteProduct = new EventEmitter<IProduct>();

  onDelete(): void {
    // console.log('Delete product:', this.product);
    this.deleteProduct.emit(this.product);
  }

}
