import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionDetailDialogComponent } from './solution-detail-dialog.component';

describe('SolutionDetailDialogComponent', () => {
  let component: SolutionDetailDialogComponent;
  let fixture: ComponentFixture<SolutionDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolutionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
