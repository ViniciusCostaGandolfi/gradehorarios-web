import { Component } from '@angular/core';
import { ProductService } from '../../../../../core/services/product/product.service';
import { ProductFormService } from '../../../../../core/services/product/product-form/product-form.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../../../core/interfaces/product';
import { Location } from '@angular/common';
import { DialogErrorContentComponent } from '../../../../../shared/dialog-error-content/dialog-error-content.component';
import { DialogSuccessComponent } from '../../../../../shared/dialog-success/dialog-success.component';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  public isLoading: boolean = false
  public images: File[] | null = null

  constructor(
    private productService:ProductService,
    public productForm: ProductFormService,
    private location: Location,
    private dialog: MatDialog,

  ) {}

  onSubmit() {
    console.log(this.productForm.getData())
    if (this.productForm.isCompleted()) {
      this.productService.create(this.productForm.getData()).subscribe(
        {
          next: (response: Product) => {

            this.dialog.open(DialogSuccessComponent, {data: {
              message: `O produto ${response.name} foi criado com sucesso`,
              link: `admin/produtos/editar/${response.id}`
            }})

          },
          error: (response) => {
            this.dialog.open(DialogErrorContentComponent, {data: {
              message: `Erro ${response.error.status}`,
            }})

            console.log(response)
          }
        }
      )
    }
  }

  back() {
    this.location.back()
  }



  
  
  
}
