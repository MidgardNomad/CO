import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDetailsComponent } from './mentor-details.component';

describe('MentorDetailsComponent', () => {
  let component: MentorDetailsComponent;
  let fixture: ComponentFixture<MentorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorDetailsComponent]
    });
    fixture = TestBed.createComponent(MentorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
