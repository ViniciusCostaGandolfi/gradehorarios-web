import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTablesComponent } from './solution-tables.component';

describe('SolutionTablesComponent', () => {
  let component: SolutionTablesComponent;
  let fixture: ComponentFixture<SolutionTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionTablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolutionTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
