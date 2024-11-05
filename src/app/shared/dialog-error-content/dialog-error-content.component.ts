import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { 
  MatDialogRef, 
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
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
  constructor(
    public dialogRef: MatDialogRef<DialogErrorContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }


}
