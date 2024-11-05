import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMerchantFormComponent } from './register-merchant-form.component';

describe('RegisterMerchantFormComponent', () => {
  let component: RegisterMerchantFormComponent;
  let fixture: ComponentFixture<RegisterMerchantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMerchantFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterMerchantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
