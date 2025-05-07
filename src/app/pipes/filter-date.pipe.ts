import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate',
  standalone: true,
})
export class FilterDatePipe implements PipeTransform {
  transform(
    items: any[],
    startDate?: string | null,
    endDate?: string | null
  ): any[] {
    // if (!items || !startDate || !endDate) return items;
    return items.filter((item) => {
      const itemDate = new Date(item.createdAt);
      if (startDate && endDate) {
        if (startDate === endDate) {
          return (
            new Date(startDate).getUTCDate() >= itemDate.getUTCDate() &&
            new Date(startDate).getUTCDate() <= itemDate.getUTCDate()
          );
        } else {
          return (
            itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
          );
        }
      } else if (startDate) {
        return itemDate >= new Date(startDate);
      } else if (endDate) {
        return itemDate <= new Date(endDate);
      } else {
        return item;
      }
    });
  }
}
