import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = 'Próxima página';
    this.previousPageLabel = 'Página anterior';
    this.itemsPerPageLabel = '';
    this.getRangeLabel = this.customRangeLabel;
  }

  private customRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length.toString()}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${(startIndex + 1).toString()} - ${endIndex.toString()} de ${length.toString()}`;
  }
}
