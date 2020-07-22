import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize(event.target.innerWidth);
  }
  cartItemCount = 0;
  showMobileMenu = false;
  isSmallScreen = false;
  isMediumLargeScreen = false;
  constructor(private service: ServiceService) {
    this.service.updateCart().subscribe(item => {
      if (item) {
        this.cartItemCount = 0;
        item.item.forEach(element => {
          this.cartItemCount += element.quantity;
        });
      }
    });
  }
  showCart = false;
  ngOnInit() {
    this.checkScreenSize(window.innerWidth);
  }

  toggleCart() {
    this.showCart = !this.showCart;
    if (this.showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''
    }
  }
  closeCart() {
    this.showCart = false;
    document.body.style.overflow = ''
  }
  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  checkScreenSize(innerWidth) {
    if (innerWidth < 768) {
      this.setScreenSize(true, false);
    } else {
      this.setScreenSize(false, true);
      this.showMobileMenu = false;
    }
  }
  setScreenSize(small, mediumlarge) {
    this.isSmallScreen = small;
    this.isMediumLargeScreen = mediumlarge;
  }
}
