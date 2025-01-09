import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private apiUrl = 'https://jsonblob.com/api/1326627873758568448';
  private products: IProduct[] = [];

  constructor() {}

  // GetAll, podria hacerse con httpclient, pero JsonBlob no permite hacer todas las operaciones CRUD, solo GET y POST. Lo hago con un fetch dentro de una funcion para poder reutilizarlo y capturar errores.
  async getProducts(): Promise<IProduct[]> {
    if (this.products.length === 0) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.statusText}`);
        }
        this.products = await response.json();
      } catch (error) {
        console.error('Error en getProducts:', error);
        throw error;
      }
    }
    return this.products;
  }

  addProduct(product: IProduct): void {
    this.products.push(product);
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter((product) => product._id !== id);
  }

  getArrLocal(): IProduct[] {
    return this.products;
  }

  filterProducts(filters: any): IProduct[] {
    return this.products.filter((product) => {
      const matchesName =
        !filters.nombre ||
        product.name.toLowerCase().includes(filters.nombre.toLowerCase());
      const matchesCategory =
        !filters.categoria || product.category === filters.categoria;
      const matchesMinPrice =
        !filters.precioMin || product.price >= +filters.precioMin;
      const matchesMaxPrice =
        !filters.precioMax || product.price <= +filters.precioMax;
      const matchesActive =
        filters.activo === undefined ||
        filters.activo === '' ||
        product.active === (filters.activo === 'true');

      return (
        matchesName &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesActive
      );
    });
  }

  //JsonBlob no permite hacer todas las operaciones CRUD, solo GET y POST. Pero lo dejo comentado.
  //DeleteById
  // async deleteProduct(id: string): Promise<void> {
  //   try {
  //     const response = await fetch(`${this.apiUrl}/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Error al eliminar producto: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error('Error en deleteProduct:', error);
  //     throw error;
  //   }
  // }
}
