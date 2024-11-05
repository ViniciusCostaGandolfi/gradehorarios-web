import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionGroupFormComponent } from './product-option-group-form.component';

describe('ProductOptionGroupFormComponent', () => {
  let component: ProductOptionGroupFormComponent;
  let fixture: ComponentFixture<ProductOptionGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOptionGroupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductOptionGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
