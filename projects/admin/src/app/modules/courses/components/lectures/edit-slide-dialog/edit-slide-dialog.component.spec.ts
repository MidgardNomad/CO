import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlideDialogComponent } from './edit-slide-dialog.component';

describe('EditSlideDialogComponent', () => {
  let component: EditSlideDialogComponent;
  let fixture: ComponentFixture<EditSlideDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSlideDialogComponent]
    });
    fixture = TestBed.createComponent(EditSlideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
