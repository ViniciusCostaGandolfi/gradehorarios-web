import { Component } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { ProductOptionGroupsService } from '../../../../../../../core/services/product/product-option-groups/product-option-groups.service';

@Component({
  selector: 'app-product-option-group-form',
  templateUrl: './product-option-group-form.component.html',
  styleUrl: './product-option-group-form.component.scss'
})
export class ProductOptionGroupFormComponent {

  constructor( public productOptionForm: ProductOptionGroupsService) {}


  addOptionGroup() {
    const newGroup = this.productOptionForm.createOptionGroup();
    this.productOptionForm.addOptionGroup(newGroup);
  }

  addOption(groupIndex: number) {
    const newOption = this.productOptionForm.createOption();
    this.productOptionForm.addOption(groupIndex, newOption);
  }

  getOptions(group: AbstractControl): FormArray {
    return group.get('options') as FormArray;
  }

  deleteOption(groupIndex: number, optionIndex: number) {
    const options = this.getOptions(this.productOptionForm.optionGroups.at(groupIndex));
    options.removeAt(optionIndex);
  }

  moveOptionUp(groupIndex: number, optionIndex: number) {
    const options = this.getOptions(this.productOptionForm.optionGroups.at(groupIndex));
    if (optionIndex > 0) {
      const optionToMoveUp = options.at(optionIndex);
      options.removeAt(optionIndex);
      options.insert(optionIndex - 1, optionToMoveUp);
    }
  }

  moveOptionDown(groupIndex: number, optionIndex: number) {
    const options = this.getOptions(this.productOptionForm.optionGroups.at(groupIndex));
    if (optionIndex < options.length - 1) {
      const optionToMoveDown = options.at(optionIndex);
      options.removeAt(optionIndex);
      options.insert(optionIndex + 1, optionToMoveDown);
    }
  }

  moveGroupUp(groupIndex: number): void {
    if (groupIndex > 0) {
      const groupArray = this.productOptionForm.optionGroups;
      const groupToMove = groupArray.at(groupIndex);
      groupArray.removeAt(groupIndex);
      groupArray.insert(groupIndex - 1, groupToMove);
    }
  }

  moveGroupDown(groupIndex: number): void {
    const groupArray = this.productOptionForm.optionGroups;
    if (groupIndex < groupArray.length - 1) {
      const groupToMove = groupArray.at(groupIndex);
      groupArray.removeAt(groupIndex);
      groupArray.insert(groupIndex + 1, groupToMove);
    }
  }

  deleteGroup(groupIndex: number): void {
    const groupArray = this.productOptionForm.optionGroups;
      groupArray.removeAt(groupIndex);
  }


}
