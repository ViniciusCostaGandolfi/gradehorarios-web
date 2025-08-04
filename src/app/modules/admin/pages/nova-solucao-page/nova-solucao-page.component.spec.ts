import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSolucaoPageComponent } from './nova-solucao-page.component';

describe('NovaSolucaoPageComponent', () => {
  let component: NovaSolucaoPageComponent;
  let fixture: ComponentFixture<NovaSolucaoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaSolucaoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovaSolucaoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
