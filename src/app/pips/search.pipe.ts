import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'console';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], type: string): any {
    if (!items || type === 'all') return items;

    // const lowerSearch = searchText.toLowerCase();

    return items.filter(
      (item => item.type === type) 
        // item.toString().toLowerCase().includes(lowerSearch)
        
    );
  }
}
