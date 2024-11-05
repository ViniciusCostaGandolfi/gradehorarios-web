import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './loading-spinner-dialog.component.html',
  styleUrl: './loading-spinner-dialog.component.scss'
})
export class LoadingSpinnerDialogComponent {

}
