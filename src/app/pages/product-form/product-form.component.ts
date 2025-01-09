import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductServiceService } from '../../services/product-service.service';
import { IProduct } from '../../models/iproduct';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})

//Explicacion:
// Para jugar un poco con el control flow y ts he decidido que el cliente solo puede elegir una categoria de las que ya estan presentes en el array de jsonblob. Realmente no creo que fuese algo que se hiciese en un proyecto real porque tiene que cargar todos los productos en el contructor para buscar la categoria, un aliexpres por ej seria inpensable pero me parecia interesante hacerlo asi por practicar.

export class ProductFormComponent {
  addProductForm!: FormGroup;  
  submitted = false;

  products: IProduct[] = [];
  categories: string[] = [];

  productService = inject(ProductServiceService);
  
  constructor() {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      price: new FormControl('', [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        ),
      ]),
      active: new FormControl('true', Validators.required),
    });

    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().then((data) => {
      this.products = data;
      this.categories = [
        ...new Set(data.map((product) => product.category)),
      ];
    }).catch((err) => {
      console.error('Error al cargar productos:', err);
    });
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return (
      this.addProductForm.get(FormControlName)?.hasError(validator) &&
      this.addProductForm.get(FormControlName)?.touched
    )
  }

  resetForm() {
    this.submitted = false;
    this.addProductForm.reset();
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      const formProduct = {
        ...this.addProductForm.value,
        _id: uuidv4()
      };
      this.productService.addProduct(formProduct);
      console.log('Producto guardado:', formProduct);
      this.resetForm();
    } else {
      console.error('Formulario inválido');
    }
  }
  
}
