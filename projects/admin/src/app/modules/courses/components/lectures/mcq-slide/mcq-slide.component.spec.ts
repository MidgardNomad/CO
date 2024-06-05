import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqSlideComponent } from './mcq-slide.component';

describe('McqSlideComponent', () => {
  let component: McqSlideComponent;
  let fixture: ComponentFixture<McqSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [McqSlideComponent]
    });
    fixture = TestBed.createComponent(McqSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
