import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProjectComponent } from './content-project.component';

describe('ContentProjectComponent', () => {
  let component: ContentProjectComponent;
  let fixture: ComponentFixture<ContentProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentProjectComponent]
    });
    fixture = TestBed.createComponent(ContentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
