import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChapterDialogComponent } from './edit-chapter-dialog.component';

describe('EditChapterDialogComponent', () => {
  let component: EditChapterDialogComponent;
  let fixture: ComponentFixture<EditChapterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChapterDialogComponent]
    });
    fixture = TestBed.createComponent(EditChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
