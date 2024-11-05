import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductOptionGroupsService {

  private form = this.fb.group({
    optionGroups: this.fb.array<FormGroup>([])
  });

  constructor(private fb: FormBuilder) {
  }

  createOptionGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      externalCode: [''],
      status: [''],
      index: [0, Validators.min(0)],
      minOptions: [0, Validators.min(0)],
      maxOptions: [0, Validators.min(0)],
      options: this.fb.array([])
    });
  }

  addOptionGroup(group: FormGroup) {
    this.form.controls["optionGroups"].push(group);
  }

  createOption(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      externalCode: [''],
      image: [''],
      price: [0, Validators.required],
      ean: ['']
    });
  }

  addOption(groupIndex: number, option: FormGroup) {
    const optionsArray = (this.form.controls["optionGroups"].at(groupIndex) as FormGroup).get('options') as FormArray;
    optionsArray.push(option);
  }

  get optionGroups() {
    return this.form.controls["optionGroups"]
  }

  getForm() {
    return this.form
  }
}
