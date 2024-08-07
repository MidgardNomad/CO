import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModComponent } from './project-mod.component';

describe('ProjectModComponent', () => {
  let component: ProjectModComponent;
  let fixture: ComponentFixture<ProjectModComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectModComponent]
    });
    fixture = TestBed.createComponent(ProjectModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
