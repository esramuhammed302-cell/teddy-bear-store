import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
})
export class CreditCardPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value.replace(/(\d{4})(?=\d)/g, '$1 - ');
  }
}
