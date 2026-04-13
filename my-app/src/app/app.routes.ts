import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { About } from './Pages/about/about';
import { Contact } from './Pages/contact/contact';
import { Products } from './products/products';
import { NotFound } from './Pages/not-found/not-found';
import { Register } from './register/register';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { SearchProducts } from './search-products/search-products';
import { ProductDetailsPage } from './Pages/product-details-page/product-details-page'; 
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products , canActivate: [authGuard]},
  { path: 'products/:id', component: ProductDetailsPage, canActivate: [authGuard] },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'search-products', component: SearchProducts , canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
