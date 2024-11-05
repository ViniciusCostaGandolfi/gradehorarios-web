import { Component } from '@angular/core';
import { ProductCategoryService } from '../../../../../core/services/product-category/product-category.service';
import { ProductCategoryFormService } from '../../../../../core/services/product-category/product-category-form/product-category-form.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../../../../../shared/dialog-success/dialog-success.component';
import { ProductCategory } from '../../../../../core/interfaces/product-category';
import { DialogErrorContentComponent } from '../../../../../shared/dialog-error-content/dialog-error-content.component';

@Component({
  selector: 'app-product-category-create',
  templateUrl: './product-category-create.component.html',
  styleUrl: './product-category-create.component.scss'
})
export class ProductCategoryCreateComponent {
  public isLoading: boolean = false

  constructor(
    private categoryService:ProductCategoryService,
    public categoryForm: ProductCategoryFormService,
    private location: Location,
    private dialog: MatDialog,

  ) {}

  onSubmit() {
    if (this.categoryForm.isCompleted()) {
      this.categoryService.createProductCategory(this.categoryForm.getData()).subscribe(
        {
          next: (response: ProductCategory) => {

            this.dialog.open(DialogSuccessComponent, {data: {
              message: `O categoria ${response.name} foi criada cm sucesso`,
              link: `admin/categorias/editar/${response.id}`
            }})

          },
          error: (error) => {
            this.dialog.open(DialogErrorContentComponent, {data: {
              message: `Erro${error.statusCode} - ${error.detail}`,
            }})
          }
        }
      )
    }
  }

  back() {
    this.location.back()
  }
}

