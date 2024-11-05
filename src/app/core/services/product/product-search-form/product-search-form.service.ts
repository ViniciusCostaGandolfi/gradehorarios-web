import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductSearchParams } from '../../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchFormService {

  private productForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    additionalInformation: new FormControl<string | null>(null),
    serving: new FormControl<string | null>(null),
    weightQuantity: new FormControl<string | null>(null),
    weightUnit: new FormControl<string | null>(null),
    volume: new FormControl<string | null>(null),
    price: new FormControl<string | null>(null),
    productType: new FormControl<string | null>(null),
  });

  isCompleted(): boolean {
    return this.productForm.valid;
  }

  getData() {
      return this.productForm.value;
  }

  get formGroup() {
    return this.productForm;
  }

}
