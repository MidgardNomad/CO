import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepottComponent } from './repott.component';

describe('RepottComponent', () => {
  let component: RepottComponent;
  let fixture: ComponentFixture<RepottComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepottComponent]
    });
    fixture = TestBed.createComponent(RepottComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
