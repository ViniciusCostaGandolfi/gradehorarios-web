import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVrpOrderComponent } from './map-vrp-order.component';

describe('MapVrpOrderComponent', () => {
  let component: MapVrpOrderComponent;
  let fixture: ComponentFixture<MapVrpOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapVrpOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapVrpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
