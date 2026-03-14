import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTab,MatTabGroup } from '@angular/material/tabs';
import { ColumnMode, NgxDatatableModule,SelectionType } from '@swimlane/ngx-datatable';


export interface SheetData {
  name: string;
  rows: Record<string, unknown>[];
  columns: { prop: string }[];
}


@Component({
    selector: 'app-excel-input-viewer',
    templateUrl: './excel-input-viewer.component.html',
    styleUrl: './excel-input-viewer.component.scss',
    standalone: true,
    imports: [MatProgressSpinner, MatTabGroup, MatTab, NgxDatatableModule]
})
export class ExcelInputViewerComponent {
  @Input() sheets: SheetData[] = [];
   
  @Input() data: Record<string, unknown>[] = [];
  @Input() isProcessing = false;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
}
