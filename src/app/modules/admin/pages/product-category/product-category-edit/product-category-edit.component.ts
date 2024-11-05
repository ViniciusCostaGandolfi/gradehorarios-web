import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../../../../core/services/product-category/product-category.service';
import { ProductCategoryFormService } from '../../../../../core/services/product-category/product-category-form/product-category-form.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductCategory } from '../../../../../core/interfaces/product-category';
import { DialogSuccessComponent } from '../../../../../shared/dialog-success/dialog-success.component';
import { DialogErrorContentComponent } from '../../../../../shared/dialog-error-content/dialog-error-content.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-category-edit',

  templateUrl: './product-category-edit.component.html',
  styleUrl: './product-category-edit.component.scss'
})
export class ProductCategoryEditComponent implements OnInit {
  public isLoading: boolean = false
  public categoryId!: number


  constructor(
    private categoryService:ProductCategoryService,
    public categoryForm: ProductCategoryFormService,
    private location: Location,
    private dialog: MatDialog,
    private route: ActivatedRoute

  ) {
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.categoryId = this.route.snapshot.params['id']; // Substitua 'id' pelo nome correto do parâmetro na sua rota

    this.categoryService.getProductCategoryById(this.categoryId).subscribe(
      {
        next: (response: ProductCategory) => {
          this.categoryForm.formGroup.controls.name.setValue(response.name)
          this.categoryForm.formGroup.controls.description.setValue(response.description)
          this.isLoading = false;
        },
        error: (error) => {
          this.dialog.open(DialogErrorContentComponent, {data: {
            message: `Erro${error.statusCode} - ${error.detail}`,
          }})
          this.isLoading = false;

        }
      }
      );
  }
  

  onSubmit() {
    if (this.categoryForm.isCompleted()) {
      this.isLoading = true;
      this.categoryService.editProductCategoryById(this.categoryId, this.categoryForm.getData()).subscribe(
        {
          next: (response: ProductCategory) => {

            this.dialog.open(DialogSuccessComponent, {data: {
              message: `O categoria ${response.name} foi alterada com sucesso`,
              link: `admin/categorias/editar/${response.id}`
            }})
            this.isLoading = false;

          },
          error: (error) => {
            this.dialog.open(DialogErrorContentComponent, {data: {
              message: `Erro${error.statusCode} - ${error.detail}`,
            }})
            this.isLoading = false;
          }
        }
      )

    }
  }

  back() {
    this.location.back()
  }
}

