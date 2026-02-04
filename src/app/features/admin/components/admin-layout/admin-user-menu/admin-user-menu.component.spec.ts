import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserMenuComponent } from './admin-user-menu.component';

describe('AdminUserMenuComponent', () => {
  let component: AdminUserMenuComponent;
  let fixture: ComponentFixture<AdminUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
