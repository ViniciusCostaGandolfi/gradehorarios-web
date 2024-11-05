import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataContentComponent } from './no-data-content.component';

describe('NoDataContentComponent', () => {
  let component: NoDataContentComponent;
  let fixture: ComponentFixture<NoDataContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoDataContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
