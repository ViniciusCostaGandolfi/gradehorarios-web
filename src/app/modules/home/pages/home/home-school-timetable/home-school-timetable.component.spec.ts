import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSchoolTimetableComponent } from './home-school-timetable.component';

describe('HomeSchoolTimetableComponent', () => {
  let component: HomeSchoolTimetableComponent;
  let fixture: ComponentFixture<HomeSchoolTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSchoolTimetableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSchoolTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
