import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'console';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], category: string): any {
    if (!items || category === 'all') return items;

    // const lowerSearch = searchText.toLowerCase();

    return items.filter(
      (item) =>
        // item.toString().toLowerCase().includes(lowerSearch)
        item.category === category
    );
  }
}
