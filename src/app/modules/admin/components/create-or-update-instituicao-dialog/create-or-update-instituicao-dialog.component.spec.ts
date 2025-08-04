import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateInstituicaoDialogComponent } from './create-or-update-instituicao-dialog.component';

describe('CreateOrUpdateInstituicaoDialogComponent', () => {
  let component: CreateOrUpdateInstituicaoDialogComponent;
  let fixture: ComponentFixture<CreateOrUpdateInstituicaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateInstituicaoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrUpdateInstituicaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
