import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteCellComponent } from './edit-delete-cell.component';

describe('EditDeleteCellComponent', () => {
  let component: EditDeleteCellComponent;
  let fixture: ComponentFixture<EditDeleteCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeleteCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeleteCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
