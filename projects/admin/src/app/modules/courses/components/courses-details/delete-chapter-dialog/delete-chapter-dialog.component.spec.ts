import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChapterDialogComponent } from './delete-chapter-dialog.component';

describe('DeleteChapterDialogComponent', () => {
  let component: DeleteChapterDialogComponent;
  let fixture: ComponentFixture<DeleteChapterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteChapterDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
