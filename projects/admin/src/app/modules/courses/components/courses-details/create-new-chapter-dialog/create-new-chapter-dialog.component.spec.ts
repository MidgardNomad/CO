import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewChapterDialogComponent } from './create-new-chapter-dialog.component';

describe('CreateNewChapterDialogComponent', () => {
  let component: CreateNewChapterDialogComponent;
  let fixture: ComponentFixture<CreateNewChapterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewChapterDialogComponent]
    });
    fixture = TestBed.createComponent(CreateNewChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
