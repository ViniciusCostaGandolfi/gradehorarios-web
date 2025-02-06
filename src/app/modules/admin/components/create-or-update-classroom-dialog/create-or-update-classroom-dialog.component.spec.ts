import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateClassroomDialogComponent } from './create-or-update-classroom-dialog.component';

describe('CreateOrUpdateClassroomDialogComponent', () => {
  let component: CreateOrUpdateClassroomDialogComponent;
  let fixture: ComponentFixture<CreateOrUpdateClassroomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateClassroomDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrUpdateClassroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
