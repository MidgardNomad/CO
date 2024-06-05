import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSlideDialogComponent } from './delete-slide-dialog.component';

describe('DeleteSlideDialogComponent', () => {
  let component: DeleteSlideDialogComponent;
  let fixture: ComponentFixture<DeleteSlideDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSlideDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteSlideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
