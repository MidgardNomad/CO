import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterDialogComponent } from './create-new-chapter-dialog.component';

describe('ChapterDialogComponent', () => {
  let component: ChapterDialogComponent;
  let fixture: ComponentFixture<ChapterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterDialogComponent],
    });
    fixture = TestBed.createComponent(ChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
