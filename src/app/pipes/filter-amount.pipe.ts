import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAmount',
  standalone: true,
})
export class FilterAmountPipe implements PipeTransform {
  transform(items: any[], amount: number | null): any[] {
    if (!items || amount === null) return items;
    return items.filter((item) => item.amount === amount);
  }
}
