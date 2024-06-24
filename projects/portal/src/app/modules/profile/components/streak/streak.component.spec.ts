import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakComponent } from './streak.component';

describe('StreakComponent', () => {
  let component: StreakComponent;
  let fixture: ComponentFixture<StreakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreakComponent]
    });
    fixture = TestBed.createComponent(StreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
