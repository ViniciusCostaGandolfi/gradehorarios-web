import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDrawerListComponent } from './admin-drawer-list.component';

describe('DashDrawerListComponent', () => {
  let component: DashDrawerListComponent;
  let fixture: ComponentFixture<DashDrawerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashDrawerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashDrawerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
