import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize(event.target.innerWidth);
  }

  constructor(private service: ServiceService, private route: ActivatedRoute) { }
  originalProducts: any;
  products: any;
  category: any;
  categorySelected: string = 'All Products';
  selectedID = null;
  isSmallScreen = true;
  isMediumScreen = false;
  isLargeScreen = false;
  ngOnInit() {
    this.service.getCategories().subscribe(data => {
      this.category = data;
    })
    this.service.getProducts().subscribe(data => {
      this.originalProducts = JSON.parse(JSON.stringify(data));
      this.originalProducts.forEach(element => {
        element.imageURL = '../../assets' + element.imageURL;
      });
      this.products = data;
      this.products.forEach(element => {
        element.imageURL = '../../assets' + element.imageURL;
      });
      this.route.params.subscribe(params => {
        if (params['id'] === '' || params['id'] === undefined) {
          this.products = JSON.parse(JSON.stringify(this.originalProducts));
          this.categorySelected = 'All Products'
        } else {
          let obj = this.category.find(cat => cat.key === params['id']);
          this.filterProducts(obj.id);
          this.categorySelected = obj.name;
        }
      });
    })
    this.checkScreenSize(window.innerWidth);
  }

  filterProducts(id) {
    this.products = [];
    if (this.selectedID && this.selectedID === id) {
      this.selectedID = null;
      this.products = this.originalProducts;
    } else {
      this.selectedID = id;
      this.originalProducts.forEach(elem => {
        if (id === elem.category) {
          this.products.push(elem);
        }
      });
    }
  }

  AddToCart(item) {
    this.service.addToCart(item);
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
}
