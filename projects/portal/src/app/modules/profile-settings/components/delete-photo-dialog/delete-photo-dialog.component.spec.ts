import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePhotoDialogComponent } from './delete-photo-dialog.component';

describe('DeletePhotoDialogComponent', () => {
  let component: DeletePhotoDialogComponent;
  let fixture: ComponentFixture<DeletePhotoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePhotoDialogComponent]
    });
    fixture = TestBed.createComponent(DeletePhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
