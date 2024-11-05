import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerButtonComponent } from './spinner-button.component';

describe('SpinnerButtonComponent', () => {
  let component: SpinnerButtonComponent;
  let fixture: ComponentFixture<SpinnerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
