import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './templates/home/home.component';
import { ProductsComponent } from './templates/products/products.component';
import { HeaderComponent } from './organisms/header/header.component';
import { FooterComponent } from './organisms/footer/footer.component';
import { SigninComponent } from './templates/signin/signin.component';
import { RegisterComponent } from './templates/register/register.component';
import { CartComponent } from './organisms/cart/cart.component';
import { ButtonComponent } from './atoms/button/button.component';
import { CategoriesComponent } from './molecules/categories/categories.component';
import { ProductDetailsComponent } from './molecules/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    RegisterComponent,
    CartComponent,
    ButtonComponent,
    CategoriesComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
