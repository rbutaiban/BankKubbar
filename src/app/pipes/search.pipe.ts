import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], type: string): any {
    if (!items || type === 'all') return items;

    return items.filter((item) => item.type === type);
  }
}
