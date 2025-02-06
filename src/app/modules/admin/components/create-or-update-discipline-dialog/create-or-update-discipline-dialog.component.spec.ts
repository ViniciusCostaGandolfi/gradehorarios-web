import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDisciplineDialogComponent } from './create-or-update-discipline-dialog.component';

describe('CreateOrUpdateDisciplineDialogComponent', () => {
  let component: CreateOrUpdateDisciplineDialogComponent;
  let fixture: ComponentFixture<CreateOrUpdateDisciplineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateDisciplineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrUpdateDisciplineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
