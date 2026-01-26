import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelInputViewerComponent } from './excel-input-viewer.component';

describe('ExcelInputViewerComponent', () => {
  let component: ExcelInputViewerComponent;
  let fixture: ComponentFixture<ExcelInputViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelInputViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelInputViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
