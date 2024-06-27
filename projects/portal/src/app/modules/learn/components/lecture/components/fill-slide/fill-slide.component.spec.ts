import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillSlideComponent } from './fill-slide.component';

describe('FillSlideComponent', () => {
  let component: FillSlideComponent;
  let fixture: ComponentFixture<FillSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillSlideComponent]
    });
    fixture = TestBed.createComponent(FillSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
