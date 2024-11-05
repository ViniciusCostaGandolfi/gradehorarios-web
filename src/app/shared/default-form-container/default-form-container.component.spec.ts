import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFormComponent } from './default-form-container.component';

describe('DefaultFormComponent', () => {
  let component: DefaultFormComponent;
  let fixture: ComponentFixture<DefaultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
