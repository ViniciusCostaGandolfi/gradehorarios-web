import { Component, ViewChild } from '@angular/core';
import { ProductCategoryService } from '../../../../../core/services/product-category/product-category.service';
import { ProductCategory, ProductCategoryParams } from '../../../../../core/interfaces/product-category';
import { ProductCategorySearchFormService } from '../../../../../core/services/product-category/product-category-search-form/product-category-search-form.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingSpinnerDialogComponent } from '../../../../../shared/loading-spinner-dialog/loading-spinner-dialog.component';
import { CanDeleteDialogComponent } from '../../../../../shared/can-delete-dialog/can-delete-dialog.component';
import { ColumnConfig } from '../../../../../core/interfaces/column-config';
import { FormControl } from '@angular/forms';
import { Paginable } from '../../../../../core/interfaces/paginable';
import { MatPaginator, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrl: './product-category-list.component.scss'
})
export class ProductCategoryListComponent {
  public productCategories: Paginable<ProductCategory> =  {
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalCount: 0,
    data: []
  }
  public columnsConfig: ColumnConfig[] = [
    { key: 'id', title: 'Contagem', visible: true },
    { key: 'name', title: 'Nome', visible: true },
    { key: 'description', title: 'Descrição', visible: true }
  ];
  public displayedColumns = this.columnsConfig.map((item) => item.key)
  public path = '/admin/categorias/'
  public showTable = true
  private page: number = 1;
  private pageSize: number = 10;


  constructor(
    private categoryService: ProductCategoryService,
    private dialog: MatDialog,
    public searchForm: ProductCategorySearchFormService
  ) {

    this.search()
  }

  public search(key?: string) {
    this.showTable = true
    this.dialog.open(LoadingSpinnerDialogComponent, { disableClose: true });
    let searchParams: any = {}
    if (key) {
      searchParams[key] = this.searchForm.formGroup.get(key)?.value
    }
    this.categoryService.getProductCategories(searchParams, this.page, this.pageSize).subscribe(
      {
        next: (response) => {
          this.productCategories = response as Paginable<ProductCategory>
          this.dialog.closeAll();
          if (this.productCategories.data.length == 0 && searchParams === undefined) {
            this.showTable = false
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.showTable = false
          this.dialog.closeAll();

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
        
        this.categoryService.deleteProductCategoryById(id).subscribe(
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
