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
import { AdminDrawerComponent } from './components/admin-layout/admin-drawer/admin-drawer.component';
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
import { AdminDrawerListComponent } from './components/admin-layout/admin-drawer/admin-drawer-list/admin-drawer-list.component';
import { AdminUserMenuComponent } from './components/admin-layout/admin-user-menu/admin-user-menu.component';
import { CollegesListPageComponent } from './pages/colleges-list-page/colleges-list-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateOrUpdateCollegeDialogComponent } from './components/create-or-update-college-dialog/create-or-update-college-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CreateOrUpdateDisciplineDialogComponent } from './components/create-or-update-discipline-dialog/create-or-update-discipline-dialog.component';
import { CreateOrUpdateTeacherDialogComponent } from './components/create-or-update-teacher-dialog/create-or-update-teacher-dialog.component';
import { CreateOrUpdateClassroomDialogComponent } from './components/create-or-update-classroom-dialog/create-or-update-classroom-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SimulateDialogComponent } from './components/simulate-dialog/simulate-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SolutionTablesComponent } from './components/solution-tables/solution-tables.component';
import { UploadTableDialogComponent } from './components/upload-table-dialog/upload-table-dialog.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CollegeDetailPageComponent } from './pages/college-detail-page/college-detail-page.component';
import { SolutionDetailDialogComponent } from './components/solution-detail-dialog/solution-detail-dialog.component';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminDrawerComponent,
    AdminHeaderComponent,
    AdminUserMenuComponent,
    CreateOrUpdateCollegeDialogComponent,
    CreateOrUpdateDisciplineDialogComponent,
    CreateOrUpdateTeacherDialogComponent,
    SettingsPageComponent,
    ProfilePageComponent,
    SolutionTablesComponent,
    CreateOrUpdateClassroomDialogComponent,
    CollegeDetailPageComponent,
    UploadTableDialogComponent,
    SimulateDialogComponent,
    SolutionDetailDialogComponent,
    AdminDrawerListComponent,
    CollegesListPageComponent,
    AdminComponent,


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
  ],

  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]

})


export class AdminModule { }
