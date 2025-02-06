import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateTeacherDialogComponent } from './create-or-update-teacher-dialog.component';

describe('CreateOrUpdateTeacherDialogComponent', () => {
  let component: CreateOrUpdateTeacherDialogComponent;
  let fixture: ComponentFixture<CreateOrUpdateTeacherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateTeacherDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrUpdateTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
