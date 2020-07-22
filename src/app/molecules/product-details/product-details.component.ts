import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize(event.target.innerWidth);
  }
  @Input() products: [];
  @Output() BuyNowClicked = new EventEmitter<any>();

  isSmallScreen = true;
  isMediumScreen = false;
  isLargeScreen = false;
  constructor() { }

  ngOnInit() {
    this.checkScreenSize(window.innerWidth);
  }

  checkScreenSize(innerWidth) {
    if (innerWidth < 768) {
      this.setScreenSize(true, false, false);
    } else if (innerWidth < 992) {
      this.setScreenSize(false, true, false);
    } else {
      this.setScreenSize(false, false, true);
    }
  }
  setScreenSize(small, medium, large) {
    this.isSmallScreen = small;
    this.isMediumScreen = medium;
    this.isLargeScreen = large;
  }

  AddToCart(product) {
    this.BuyNowClicked.emit(product);
  }
}
