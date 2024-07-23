import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDialogComponent } from './mentor-dialog.component';

describe('MentorDialogComponent', () => {
  let component: MentorDialogComponent;
  let fixture: ComponentFixture<MentorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentorDialogComponent]
    });
    fixture = TestBed.createComponent(MentorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
