import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDetailPageComponent } from './college-detail-page.component';

describe('CollegeDetailPageComponent', () => {
  let component: CollegeDetailPageComponent;
  let fixture: ComponentFixture<CollegeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
