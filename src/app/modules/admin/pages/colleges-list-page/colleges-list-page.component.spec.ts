import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegesListPageComponent } from './colleges-list-page.component';

describe('CollegesListPageComponent', () => {
  let component: CollegesListPageComponent;
  let fixture: ComponentFixture<CollegesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegesListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
