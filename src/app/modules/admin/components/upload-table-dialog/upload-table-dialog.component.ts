import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-table-dialog',
  templateUrl: './upload-table-dialog.component.html',
  styleUrl: './upload-table-dialog.component.scss'
})
export class UploadTableDialogComponent {

  onSubmit() {}

  downloadTemplate(): void {
    const link = document.createElement('a');
    link.href = 'assets/tables/modelo.xlsx';
    link.download = 'modelo.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
