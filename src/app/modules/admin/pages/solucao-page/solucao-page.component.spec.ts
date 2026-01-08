import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolucaoPageComponent } from './solucao-page.component';

describe('SolucaoPageComponent', () => {
  let component: SolucaoPageComponent;
  let fixture: ComponentFixture<SolucaoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolucaoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolucaoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
