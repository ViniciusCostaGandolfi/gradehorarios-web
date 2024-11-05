import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTableCellComponent } from './default-table-cell.component';

describe('DefaultTableCellComponent', () => {
  let component: DefaultTableCellComponent;
  let fixture: ComponentFixture<DefaultTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultTableCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
