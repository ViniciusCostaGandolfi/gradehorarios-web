import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

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
  public dialogRef = inject(MatDialogRef<DialogSuccessComponent>);
  public data: { message: string; link: string } = inject(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}