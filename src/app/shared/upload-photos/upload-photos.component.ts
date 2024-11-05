import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-photos',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './upload-photos.component.html',
  styleUrl: './upload-photos.component.scss'
})
export class UploadPhotosComponent {

  public images: File[] | null = null
  public imagesUrl: string[] | null = null

  @Input() isMultiple: boolean = false;

  @Output() selectImages = new EventEmitter<File[] | null>();

  onMultipleFilesSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList) {
      const validFiles = Array.from(fileList).filter(file => this.isValidImage(file));
      
      if (validFiles.length !== Array.from(fileList).length) {
        alert('Aceitamos apenas imagens PNG/JPEG/JPG.');
      }

      this.imagesUrl = validFiles.map(file => URL.createObjectURL(file));
      this.images = validFiles;
      this.selectImages.emit(this.images);
    } else {
      this.imagesUrl = [];
      this.images = [];
    }
  }

  private isValidImage(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
  }

}
