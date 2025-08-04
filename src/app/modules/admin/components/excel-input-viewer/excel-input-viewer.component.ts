import { Component, Input } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

export interface SheetData {
  name: string;
  rows: any[];
  columns: { prop: string }[];
}


@Component({
  selector: 'app-excel-input-viewer',
  templateUrl: './excel-input-viewer.component.html',
  styleUrl: './excel-input-viewer.component.scss'
})
export class ExcelInputViewerComponent {
  @Input() sheets: SheetData[] = [];
  @Input() isProcessing: boolean = false;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
}
