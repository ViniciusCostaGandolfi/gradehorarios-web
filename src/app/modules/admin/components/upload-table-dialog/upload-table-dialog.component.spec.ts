import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTableDialogComponent } from './upload-table-dialog.component';

describe('UploadTableDialogComponent', () => {
  let component: UploadTableDialogComponent;
  let fixture: ComponentFixture<UploadTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadTableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
