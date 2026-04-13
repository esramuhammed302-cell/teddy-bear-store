import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '../../Models/Store';
import { AuthService } from '../../Services/AuthService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  store: Store = new Store(
    'TEDDY BEAR',
    ['Branch 1', 'Branch 2'],
    'https://marketplace.canva.com/EAGHsTZXQPs/1/0/1600w/canva-pink-brown-cute-circle-cake-and-dessert-logo-6C6QBzXYqss.jpg',
  );

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
