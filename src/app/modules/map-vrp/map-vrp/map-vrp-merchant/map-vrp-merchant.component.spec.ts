import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVrpMerchantComponent } from './map-vrp-merchant.component';

describe('MapVrpMerchantComponent', () => {
  let component: MapVrpMerchantComponent;
  let fixture: ComponentFixture<MapVrpMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapVrpMerchantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapVrpMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
