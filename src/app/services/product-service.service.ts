import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private apiUrl = 'https://jsonblob.com/api/1326627873758568448';
  private products: IProduct[] = [];

  constructor() { }

  // GetAll
  async getProducts(): Promise<any[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Error al obtener productos: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProducts:', error);
      throw error;
    }
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

  // async addProduct(product: IProduct): Promise<void> {
  //   try {
  //     const response = await fetch(this.apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(product)
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Error al agregar producto: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error('Error en addProduct:', error);
  //     throw error;
  //   }
  // }
}
