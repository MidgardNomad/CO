import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLectureDeletionDialogComponent } from './confirm-lecture-deletion-dialog.component';

describe('ConfirmLectureDeletionDialogComponent', () => {
  let component: ConfirmLectureDeletionDialogComponent;
  let fixture: ComponentFixture<ConfirmLectureDeletionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmLectureDeletionDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmLectureDeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
