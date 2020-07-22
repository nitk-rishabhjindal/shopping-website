import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: ServiceService) { }
  categories: any;
  slideIndex = 1;
  banners: any;
  timeOut: any;
  ngOnInit() {
    this.service.getCategories().subscribe(data => {
      this.categories = data;

      this.categories = this.categories.filter(elem => {
        elem.imageUrl = '../../assets' + elem.imageUrl;
        return elem.enabled === true;
      })
    });

    this.service.getBanners().subscribe(data => {
      this.banners = data;
      this.banners.forEach(element => {
        element.bannerImageUrl = '../../assets' + element.bannerImageUrl;
      });
      setTimeout(() => {
        this.showSlides(this.slideIndex);
      }, 0);
    });

  }

  plusSlides(n) {
    clearTimeout(this.timeOut);
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    clearTimeout(this.timeOut);
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("btn-slideshow__dot");
    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i]['style'].display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides.length !== 0) {
      slides[this.slideIndex - 1]['style'].display = "block";
      dots[this.slideIndex - 1].className += " active";
      this.timeOut = setTimeout(() => {
        this.showSlides(++this.slideIndex);
      }, 3000);
    }
  }
}
