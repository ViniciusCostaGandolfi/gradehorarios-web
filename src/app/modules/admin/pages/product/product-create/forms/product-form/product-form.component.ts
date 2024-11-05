import { Component } from '@angular/core';
import { ProductFormService } from '../../../../../../../core/services/product/product-form/product-form.service';
import { ValidateImagesService } from '../../../../../../../core/services/validate-images/validate-images.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  constructor(
    public productForm: ProductFormService,
    private validateImage: ValidateImagesService
  ) {}

  onMultipleFilesSelected(files: File[] | null): void {
    if (files && this.validateImage.hasValid(files)) {
      this.validateImage.toBase64(files).subscribe({
        next: (imagesBase64) => {
          this.productForm.formGroup.controls.image.setValue(imagesBase64[0]);
          this.productForm.formGroup.controls.multipleImages.setValue(imagesBase64.splice(1));
        }
      });
    } else {
      this.productForm.formGroup.controls.image.setValue(null)
      this.productForm.formGroup.controls.multipleImages.setValue([])
    }
  }



  onSubmit() {
  }
}
