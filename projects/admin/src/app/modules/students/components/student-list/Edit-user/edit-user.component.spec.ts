import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeditUserComponent } from './eedit-user.component';

describe('EeditUserComponent', () => {
  let component: EeditUserComponent;
  let fixture: ComponentFixture<EeditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EeditUserComponent]
    });
    fixture = TestBed.createComponent(EeditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
