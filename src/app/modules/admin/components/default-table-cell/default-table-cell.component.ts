import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-table-cell',
  templateUrl: './default-table-cell.component.html',
  styleUrl: './default-table-cell.component.scss'
})
export class DefaultTableCellComponent {

  @Input() element: any = {}
  @Input() index: number = 0
  @Input() columnName: string = ''
  @Input() path:string = ''
  @Output() deleteEvent = new EventEmitter<number>();

  onDelete(id?: number): void {
    this.deleteEvent.emit(id);
  }


}
