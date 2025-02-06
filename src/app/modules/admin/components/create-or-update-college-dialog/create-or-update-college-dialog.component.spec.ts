import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCollegeDialogComponent } from './create-or-update-college-dialog.component';

describe('CreateOrUpdateCollegeDialogComponent', () => {
  let component: CreateOrUpdateCollegeDialogComponent;
  let fixture: ComponentFixture<CreateOrUpdateCollegeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateCollegeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrUpdateCollegeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
