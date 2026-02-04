import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionResultDialogComponent } from './solution-result-dialog.component';

describe('SolutionResultDialogComponent', () => {
  let component: SolutionResultDialogComponent;
  let fixture: ComponentFixture<SolutionResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionResultDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolutionResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
