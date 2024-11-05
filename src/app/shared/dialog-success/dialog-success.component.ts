import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { DialogErrorContentComponent } from '../dialog-error-content/dialog-error-content.component';

@Component({
  selector: 'app-dialog-success',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './dialog-success.component.html',
  styleUrl: './dialog-success.component.scss'
})
export class DialogSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogErrorContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      message: string,
      link: string,
    }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }


}