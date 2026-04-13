import { Component, signal  } from '@angular/core';
import { RouterOutlet , RouterLink , RouterLinkActive } from '@angular/router';
import { Products } from './products/products';
import { Navbar } from './shared/navbar/navbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Products, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('my-app');
}
