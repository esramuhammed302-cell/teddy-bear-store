import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductCard]',
})
export class ProductCard {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '15px');
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    );
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'transition', '0.3s');
  }
}
