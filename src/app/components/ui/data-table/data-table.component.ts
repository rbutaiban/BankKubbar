import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { UsernamePipe } from '../../../pips/username.pipe';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CurrencyPipe, UsernamePipe],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<T extends Record<string, any>>
  implements OnChanges
{
  @Input() data: T[] = [];
  @Input() pageSize: number = 10;
  @Input() headerKeys: string[] = [];

  protected Object = Object;
  protected currentPage: number = 1;
  protected totalPages: number = 1;
  protected paginatedData: T[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['pageSize']) {
      this.updatePagination();
    }
  }

  private updatePagination(): void {
    if (!this.data || this.data.length === 0) {
      this.paginatedData = [];
      this.totalPages = 1;
      return;
    }

    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    if (this.currentPage < 1) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.data.length);
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  getHeaderKeys(): string[] {
    if (this.headerKeys && this.headerKeys.length > 0) {
      return this.headerKeys;
    }

    if (this.data && this.data.length > 0) {
      return Object.keys(this.data[0]);
    }

    return [];
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getVisiblePageNumbers(): number[] {
    if (this.totalPages <= 7) {
      return this.getPageNumbers();
    }

    const visiblePages: number[] = [];

    // Always add first page
    visiblePages.push(1);

    // Add pages around current page
    const startPage = Math.max(2, this.currentPage - 1);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);

    // Add ellipsis marker for gap before middle pages
    if (startPage > 2) {
      visiblePages.push(-1); // -1 represents ellipsis
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    // Add ellipsis marker for gap after middle pages
    if (endPage < this.totalPages - 1) {
      visiblePages.push(-2); // -2 represents ellipsis
    }

    // Always add last page
    visiblePages.push(this.totalPages);

    return visiblePages;
  }
}
