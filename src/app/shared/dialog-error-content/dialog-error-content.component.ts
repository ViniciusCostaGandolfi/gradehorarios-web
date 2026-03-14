import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef} from '@angular/material/dialog';
import { 
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent, 
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error-content',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule
  ],
  templateUrl: './dialog-error-content.component.html',
  styleUrl: './dialog-error-content.component.scss'
})
export class DialogErrorContentComponent {
  public dialogRef = inject(MatDialogRef<DialogErrorContentComponent>);
  public data: { message: string } = inject(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}
