import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DefaultFormContainerComponent } from '../../shared/default-form-container/default-form-container.component';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './pages/admin.component';
import { ProductCategoryListComponent } from './pages/product-category/product-category-list/product-category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ProductCategoryCreateComponent } from './pages/product-category/product-category-create/product-category-create.component';
import {MatTableModule} from '@angular/material/table';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AdminDrawerComponent } from './components/admin-layout/admin-drawer/admin-drawer.component';
import { AdminHeaderComponent } from './components/admin-layout/admin-header/admin-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminUserMenuComponent } from './components/admin-layout/admin-user-menu/admin-user-menu.component';
import { adminDrawerListComponent } from './components/admin-layout/admin-drawer/admin-drawer-list/admin-drawer-list.component';
import { NoDataContentComponent } from '../../shared/no-data-content/no-data-content.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoadingSpinnerDialogComponent } from '../../shared/loading-spinner-dialog/loading-spinner-dialog.component';
import { ProductCategoryEditComponent } from './pages/product-category/product-category-edit/product-category-edit.component';
import { CanDeleteDialogComponent } from '../../shared/can-delete-dialog/can-delete-dialog.component';
import { DefaultTableHeaderComponent } from './components/default-table-header/default-table-header.component';
import { DefaultTableCellComponent } from './components/default-table-cell/default-table-cell.component';
import { DefaultColumnsControlComponent } from './components/default-columns-control/default-columns-control.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductCreateComponent } from './pages/product/product-create/product-create.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { UploadPhotosComponent } from '../../shared/upload-photos/upload-photos.component';
import { ProductFormComponent } from './pages/product/product-create/forms/product-form/product-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ProductOptionGroupFormComponent } from './pages/product/product-create/forms/product-option-group-form/product-option-group-form.component';
import { CustomPaginator } from './components/custom-paginator/custom-paginator';


@NgModule({
  declarations: [
    AdminDrawerComponent,
    adminDrawerListComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminUserMenuComponent,
    AdminComponent,
    ProductCategoryListComponent,
    ProductCategoryCreateComponent,
    ProductCategoryEditComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductFormComponent,
    ProductOptionGroupFormComponent,
    ProductEditComponent,
    DefaultTableHeaderComponent,
    DefaultTableCellComponent,
    DefaultColumnsControlComponent

  ],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatNavList,
    MatMenuModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultFormContainerComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerDialogComponent,
    CanDeleteDialogComponent,
    SpinnerButtonComponent,
    FooterComponent,
    NoDataContentComponent,
    UploadPhotosComponent,
  ],

  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]

})


export class AdminModule { }
