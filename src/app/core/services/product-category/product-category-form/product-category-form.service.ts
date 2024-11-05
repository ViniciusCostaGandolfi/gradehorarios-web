import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from '../../../interfaces/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryFormService {
  private productCategoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', Validators.required),
  });

  isCompleted(): boolean {
    return this.productCategoryForm.valid;
  }

  getData(): ProductCategory {
      return this.productCategoryForm.value as ProductCategory;
  }

  get formGroup() {
    return this.productCategoryForm;
  }

}
