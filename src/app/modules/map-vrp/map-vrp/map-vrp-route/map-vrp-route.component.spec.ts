import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVrpRouteComponent } from './map-vrp-route.component';

describe('MapVrpRouteComponent', () => {
  let component: MapVrpRouteComponent;
  let fixture: ComponentFixture<MapVrpRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapVrpRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapVrpRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
