import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultColumnsControlComponent } from './default-columns-control.component';

describe('DefaultColumnsControlComponent', () => {
  let component: DefaultColumnsControlComponent;
  let fixture: ComponentFixture<DefaultColumnsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultColumnsControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultColumnsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
