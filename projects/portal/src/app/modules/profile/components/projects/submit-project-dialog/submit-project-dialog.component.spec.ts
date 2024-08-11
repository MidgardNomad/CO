import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProjectDialogComponent } from './submit-project-dialog.component';

describe('SubmitProjectDialogComponent', () => {
  let component: SubmitProjectDialogComponent;
  let fixture: ComponentFixture<SubmitProjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitProjectDialogComponent]
    });
    fixture = TestBed.createComponent(SubmitProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
