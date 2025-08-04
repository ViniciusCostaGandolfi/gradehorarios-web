import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPageComponent } from './usuarios-page.component';

describe('UsuariosPageComponent', () => {
  let component: UsuariosPageComponent;
  let fixture: ComponentFixture<UsuariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
