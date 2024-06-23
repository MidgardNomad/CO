import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLiberComponent } from './student-liber.component';

describe('StudentLiberComponent', () => {
  let component: StudentLiberComponent;
  let fixture: ComponentFixture<StudentLiberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLiberComponent]
    });
    fixture = TestBed.createComponent(StudentLiberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
