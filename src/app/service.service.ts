import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private addToCartItem = new BehaviorSubject<any>(null);

  cartItem = [];

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('http://localhost:5000/categories');
  }

  getProducts() {
    return this.http.get('http://localhost:5000/products')
  }

  getBanners() {
    return this.http.get('http://localhost:5000/banners')
  }

  addToCart(item) {
    let isItemPresent = false;
    this.cartItem.forEach(elem => {
      if (elem.id === item.id) {
        elem.quantity++;
        isItemPresent = true;
      }
    });
    if (!isItemPresent) {
      item.quantity = 1;
      this.cartItem.push(item);
    }
    this.addToCartItem.next({ item: this.cartItem });
  }
  removeItemFromCart(cart) {
    this.cartItem = cart;
    this.addToCartItem.next({ item: this.cartItem });
  }
  updateCart(): Observable<any> {
    return this.addToCartItem.asObservable();
  }

}
