import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DefaultFormContainerComponent } from '../../shared/default-form-container/default-form-container.component';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './pages/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AdminHeaderComponent } from './components/admin-layout/admin-header/admin-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoDataContentComponent } from '../../shared/no-data-content/no-data-content.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoadingSpinnerDialogComponent } from '../../shared/loading-spinner-dialog/loading-spinner-dialog.component';
import { CanDeleteDialogComponent } from '../../shared/can-delete-dialog/can-delete-dialog.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { CustomPaginator } from './components/custom-paginator/custom-paginator';
import { AdminUserMenuComponent } from './components/admin-layout/admin-user-menu/admin-user-menu.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { InstituicoesPageComponent } from './pages/instituicoes-page/instituicoes-page.component';
import { InstituicaoPageComponent } from './pages/instituicao-page/instituicao-page.component';
import { CreateOrUpdateInstituicaoDialogComponent } from './components/create-or-update-instituicao-dialog/create-or-update-instituicao-dialog.component';
import { NovaSolucaoPageComponent } from './pages/nova-solucao-page/nova-solucao-page.component';
import { ExcelInputViewerComponent } from './components/excel-input-viewer/excel-input-viewer.component';
import { MatTabsModule } from '@angular/material/tabs'; // Importar MatTabsModule
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; // Importar NgxDatatableModule



@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminUserMenuComponent,
    InstituicoesPageComponent,
    InstituicaoPageComponent,
    CreateOrUpdateInstituicaoDialogComponent,
    AdminComponent,
    ExcelInputViewerComponent,
    NovaSolucaoPageComponent
  ],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSidenavModule,
    MatNavList,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    RouterModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultFormContainerComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerDialogComponent,
    CanDeleteDialogComponent,
    SpinnerButtonComponent,
    FooterComponent,
    NoDataContentComponent,
    MatTabsModule,
    NgxDatatableModule
  ],

  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]

})


export class AdminModule { }
