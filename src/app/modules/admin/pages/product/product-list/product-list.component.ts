import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { CanDeleteDialogComponent } from '../../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { LoadingSpinnerDialogComponent } from '../../../../../shared/loading-spinner-dialog/loading-spinner-dialog.component';
import { Paginable } from '../../../../../core/interfaces/paginable';
import { Product } from '../../../../../core/interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { ColumnConfig } from '../../../../../core/interfaces/column-config';
import { ProductSearchFormService } from '../../../../../core/services/product/product-search-form/product-search-form.service';
import { ProductService } from '../../../../../core/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  public product: Paginable<Product> =  {
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalCount: 0,
    data: []
  }
  public columnsConfig: ColumnConfig[] = [
    { key: 'id', title: 'Contagem', visible: true },
    { key: 'name', title: 'Nome', visible: true },
    { key: 'description', title: 'Descrição', visible: true },
    { key: 'additionalInformation', title: 'Informações Adicionais', visible: true },
    { key: 'serving', title: 'Porção', visible: true },
    { key: 'dietaryRestrictions', title: 'Restrições Alimentares', visible: true },
    { key: 'weightQuantity', title: 'Quantidade (Peso)', visible: true },
    { key: 'weightUnit', title: 'Unidade de Peso', visible: true },
    { key: 'volume', title: 'Volume', visible: true },
    { key: 'price', title: 'Preço', visible: true },
    { key: 'productType', title: 'Tipo de Produto', visible: true }
  ];
  public displayedColumns = this.columnsConfig.map((item) => item.key)
  public path = '/admin/categorias/'
  public showTable = true
  private page: number = 1;
  private pageSize: number = 10;


  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    public searchForm: ProductSearchFormService
  ) {

    this.search()
  }

  public search(key?: string) {
    this.dialog.open(LoadingSpinnerDialogComponent, { disableClose: true });
    let searchParams: any = {}
    this.showTable = false
    if (key) {
      searchParams[key] = this.searchForm.formGroup.get(key)?.value
    }
    this.productService.get(searchParams, this.page, this.pageSize).subscribe(
      {
        next: (response) => {
          this.product = response as Paginable<Product>
          this.dialog.closeAll();
          if (this.product.data.length == 0 && searchParams === undefined) {
            this.showTable = false
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.dialog.closeAll();
          this.showTable = false

        },
      }
    )
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(CanDeleteDialogComponent, {data: {
      message: 'Quer escluir esta categoria?'
    }})

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.productService.deleteById(id).subscribe(
          {
            next: () => {
              this.search()
              
            },
            error: (error) => {
              console.error('Error:', error);
              this.dialog.closeAll();
            },
          }
        );
      }
    });
  }

  getFormControl(key: string): FormControl {
    const control = this.searchForm.formGroup.get(key);
    return control as FormControl;
  }

  onChangeColumn(columns: string[]) {
    this.displayedColumns = columns.map((item) => item)
  }

  public onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize,
    this.page = event.pageIndex + 1
    this.search();
  }

}
