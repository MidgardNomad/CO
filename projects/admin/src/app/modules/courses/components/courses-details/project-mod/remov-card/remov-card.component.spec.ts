import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovCardComponent } from './remov-card.component';

describe('RemovCardComponent', () => {
  let component: RemovCardComponent;
  let fixture: ComponentFixture<RemovCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovCardComponent]
    });
    fixture = TestBed.createComponent(RemovCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
