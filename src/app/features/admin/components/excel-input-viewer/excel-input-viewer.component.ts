import { Component, Input } from '@angular/core';
import { ColumnMode, SelectionType, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf, NgFor } from '@angular/common';

export interface SheetData {
  name: string;
  rows: any[];
  columns: { prop: string }[];
}


@Component({
    selector: 'app-excel-input-viewer',
    templateUrl: './excel-input-viewer.component.html',
    styleUrl: './excel-input-viewer.component.scss',
    standalone: true,
    imports: [NgIf, MatProgressSpinner, MatTabGroup, NgFor, MatTab, NgxDatatableModule]
})
export class ExcelInputViewerComponent {
  @Input() sheets: SheetData[] = [];
  @Input() isProcessing: boolean = false;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
}
