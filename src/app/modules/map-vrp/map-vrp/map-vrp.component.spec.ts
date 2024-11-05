import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVrpComponent } from './map-vrp.component';

describe('MapVrpComponent', () => {
  let component: MapVrpComponent;
  let fixture: ComponentFixture<MapVrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapVrpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapVrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
