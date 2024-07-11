import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPhoneNumberComponent } from './verify-phone-number.component';

describe('VerifyPhoneNumberComponent', () => {
  let component: VerifyPhoneNumberComponent;
  let fixture: ComponentFixture<VerifyPhoneNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyPhoneNumberComponent]
    });
    fixture = TestBed.createComponent(VerifyPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
