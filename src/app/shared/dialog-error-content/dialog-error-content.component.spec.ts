import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorContentComponent } from './dialog-error-content.component';

describe('DialogErrorContentComponent', () => {
  let component: DialogErrorContentComponent;
  let fixture: ComponentFixture<DialogErrorContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogErrorContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogErrorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
