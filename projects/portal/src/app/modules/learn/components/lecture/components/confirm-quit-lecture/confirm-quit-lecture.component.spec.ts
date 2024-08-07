import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmQuitLectureComponent } from './confirm-quit-lecture.component';

describe('ConfirmQuitLectureComponent', () => {
  let component: ConfirmQuitLectureComponent;
  let fixture: ComponentFixture<ConfirmQuitLectureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmQuitLectureComponent]
    });
    fixture = TestBed.createComponent(ConfirmQuitLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
