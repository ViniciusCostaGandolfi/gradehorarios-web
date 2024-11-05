import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryListComponent } from './product-category-list.component';

describe('ProductCategoryListComponent', () => {
  let component: ProductCategoryListComponent;
  let fixture: ComponentFixture<ProductCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
