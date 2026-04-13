import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.html',
  styleUrl: './clock.scss',
})
export class Clock implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  timer: any;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    console.log('Clock stopped');
  }
}
