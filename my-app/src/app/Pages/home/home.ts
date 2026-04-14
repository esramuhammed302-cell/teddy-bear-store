import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { Clock } from '../../clock/clock';

@Component({
  selector: 'app-home',
  imports: [ RouterLink, Clock],
  templateUrl: './home.html',
  styleUrl:'../theme.scss' ,
})
export class Home {

}
