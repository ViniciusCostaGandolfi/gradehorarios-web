import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTableHeaderComponent } from './default-table-header.component';

describe('DefaultTableHeaderComponent', () => {
  let component: DefaultTableHeaderComponent;
  let fixture: ComponentFixture<DefaultTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultTableHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
