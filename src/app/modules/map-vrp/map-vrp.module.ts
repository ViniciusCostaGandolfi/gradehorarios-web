import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MapVrpComponent } from './map-vrp/map-vrp.component';
import { MapVrpRouteComponent } from './map-vrp/map-vrp-route/map-vrp-route.component';
import { MapVrpOrderComponent } from './map-vrp/map-vrp-order/map-vrp-order.component';
import { MapVrpMerchantComponent } from './map-vrp/map-vrp-merchant/map-vrp-merchant.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    MapVrpComponent,
    MapVrpRouteComponent, 
    MapVrpOrderComponent,
    MapVrpMerchantComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    NgxMapLibreGLModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
  ],
  exports: [
    MapVrpComponent,
    MapVrpRouteComponent, 
    MapVrpOrderComponent,
    MapVrpMerchantComponent,
  ]
})
export class MapVrpModule { }
