import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanDeleteDialogComponent } from './can-delete-dialog.component';

describe('CanDeleteDialogComponent', () => {
  let component: CanDeleteDialogComponent;
  let fixture: ComponentFixture<CanDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
