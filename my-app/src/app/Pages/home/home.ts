import { Component } from '@angular/core';
import { Products } from '../../products/products';
import {RouterLink} from '@angular/router';
import { Clock } from '../../clock/clock';

@Component({
  selector: 'app-home',
  imports: [Products, RouterLink, Clock],
  templateUrl: './home.html',
  styleUrl:'../theme.scss',
})
export class Home {

}
