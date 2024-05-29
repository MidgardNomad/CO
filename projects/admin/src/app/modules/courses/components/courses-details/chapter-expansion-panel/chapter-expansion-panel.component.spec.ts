import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterExpansionPanelComponent } from './chapter-expansion-panel.component';

describe('ChapterExpansionPanelComponent', () => {
  let component: ChapterExpansionPanelComponent;
  let fixture: ComponentFixture<ChapterExpansionPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterExpansionPanelComponent]
    });
    fixture = TestBed.createComponent(ChapterExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
