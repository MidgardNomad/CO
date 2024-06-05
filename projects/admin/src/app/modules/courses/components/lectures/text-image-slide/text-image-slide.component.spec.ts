import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextImageSlideComponent } from './text-image-slide.component';

describe('TextImageSlideComponent', () => {
  let component: TextImageSlideComponent;
  let fixture: ComponentFixture<TextImageSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextImageSlideComponent]
    });
    fixture = TestBed.createComponent(TextImageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
