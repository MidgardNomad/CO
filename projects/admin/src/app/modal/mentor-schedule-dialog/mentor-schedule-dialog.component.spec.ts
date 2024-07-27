import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorScheduleDialogComponent } from './mentor-schedule-dialog.component';

describe('MentorScheduleDialogComponent', () => {
  let component: MentorScheduleDialogComponent;
  let fixture: ComponentFixture<MentorScheduleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorScheduleDialogComponent]
    });
    fixture = TestBed.createComponent(MentorScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
