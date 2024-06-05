import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlideDialogComponent } from './add-slide-dialog.component';

describe('AddSlideDialogComponent', () => {
  let component: AddSlideDialogComponent;
  let fixture: ComponentFixture<AddSlideDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSlideDialogComponent]
    });
    fixture = TestBed.createComponent(AddSlideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
