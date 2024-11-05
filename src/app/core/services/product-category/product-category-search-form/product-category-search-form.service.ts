import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryParams } from '../../../interfaces/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategorySearchFormService {
  private productCategoryForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
  });

  isCompleted(): boolean {
    return this.productCategoryForm.valid;
  }

  getData() {
      return this.productCategoryForm.value as ProductCategoryParams;
  }

  get formGroup() {
    return this.productCategoryForm;
  }

}
