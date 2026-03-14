import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-can-delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './can-delete-dialog.component.html',
  styleUrl: './can-delete-dialog.component.scss'
})
export class CanDeleteDialogComponent {
  public dialogRef = inject(MatDialogRef<CanDeleteDialogComponent>);
  public data: { message: string } = inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
