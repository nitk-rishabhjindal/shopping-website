import { Component, OnInit, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {
  cartItem = [];
  subscription: Subscription;
  totalPrice = 0;
  cartItemQuantity = 0;
  @Output() closeCart = new EventEmitter<boolean>();

  @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.cartItem.length === 0) {
      if (event.keyCode === 9) {
        if (event.target['id'] === 'shoppingCart-checkout') {
          event.preventDefault();
          document.getElementById('close-cart').focus();
        }
        if (event.target['id'] === 'close-cart') {
          event.preventDefault();
          document.getElementById('shoppingCart-checkout').focus();
        }
      }
      if (event.keyCode === 13) {
        this.closeCartClicked();
      }
    } else {
      if (event.keyCode === 9) {
        if (event.target['id'].substring(0, 7) === 'addItem' && Number(event.target['id'][7]) === (this.cartItem.length - 1)) {
          event.preventDefault();
          document.getElementById('shoppingCart-checkout').focus();
        }
        if (event.target['id'] === 'shoppingCart-checkout') {
          event.preventDefault();
          document.getElementById('close-cart').focus();
        }
      }
      if (event.keyCode === 13) {
        if (['close-cart', 'shoppingCart-checkout'].indexOf(event.target['id']) !== -1) {
          this.closeCartClicked();
        } else if (event.target['id'].substring(0, 10) === 'removeItem') {
          let index = Number(event.target['id'][10]);
          this.substractQuantity(index);
        } else {
          let index = Number(event.target['id'][7]);
          this.addQuantity(this.cartItem[index]);
        }
      }
    }
  }

  constructor(private service: ServiceService) {
    this.service.updateCart().subscribe(item => {
      if (item) {
        this.cartItem = item.item;
        this.totalPrice = 0;
        this.cartItemQuantity = 0;
        this.cartItem.forEach(elem => {
          this.totalPrice += (elem.quantity * elem.price);
          this.cartItemQuantity += elem.quantity;
        })
      }
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // if (this.cartItem.length === 0) {
    //   document.getElementById('shoppingCart-checkout').focus();
    // } else {
    //   document.getElementById('removeItem0').focus();
    // }
  }


  closeCartClicked() {
    this.closeCart.emit(true);
  }

  addQuantity(item) {
    this.service.addToCart(item);
  }

  substractQuantity(i) {
    this.cartItemQuantity--;
    if (this.cartItem[i].quantity === 1) {
      this.cartItem.splice(i, 1);
      this.service.removeItemFromCart(this.cartItem);
      if (this.cartItem.length) {
        document.getElementById(`removeItem${i + 1}`).focus();
      }
    } else {
      this.cartItem[i].quantity--;
      this.service.removeItemFromCart(this.cartItem);
    }
  }
}
