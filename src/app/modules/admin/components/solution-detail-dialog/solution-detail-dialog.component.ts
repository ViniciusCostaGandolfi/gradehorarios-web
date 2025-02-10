import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SolutionDto } from '../../../../core/interfaces/solution-dto';

@Component({
  selector: 'app-solution-detail-dialog',
  templateUrl: './solution-detail-dialog.component.html',
  styleUrl: './solution-detail-dialog.component.scss'
})
export class SolutionDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SolutionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { solution: SolutionDto }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
