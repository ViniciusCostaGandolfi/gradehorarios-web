import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateDialogComponent } from './simulate-dialog.component';

describe('SimulateDialogComponent', () => {
  let component: SimulateDialogComponent;
  let fixture: ComponentFixture<SimulateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
