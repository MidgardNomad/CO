import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoDialogComponent } from './update-photo-dialog.component';

describe('UpdatePhotoDialogComponent', () => {
  let component: UpdatePhotoDialogComponent;
  let fixture: ComponentFixture<UpdatePhotoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePhotoDialogComponent]
    });
    fixture = TestBed.createComponent(UpdatePhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
