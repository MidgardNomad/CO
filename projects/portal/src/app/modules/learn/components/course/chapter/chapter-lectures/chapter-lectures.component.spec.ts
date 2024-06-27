import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLecturesComponent } from './chapter-lectures.component';

describe('ChapterLecturesComponent', () => {
  let component: ChapterLecturesComponent;
  let fixture: ComponentFixture<ChapterLecturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterLecturesComponent]
    });
    fixture = TestBed.createComponent(ChapterLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
