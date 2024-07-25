import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerPathService, Course, CoursesService } from 'DAL';
import { CareerDetailsDialogComponent } from 'projects/admin/src/app/modal/career-details-dialog/career-details-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss'],
})
export class CareerDetailsComponent implements OnInit {
  courses: Observable<Course[]>;
  careerPathId: string;
  panelOpenState = false;

  constructor(
    private dialog: MatDialog,
    private careerPathService: CareerPathService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.careerPathId = this.route.snapshot.paramMap.get('id');
    this.courses = this.careerPathService.getAllCareerCourses(
      this.careerPathId
    );
  }

  addCourse() {
    this.dialog.open(CareerDetailsDialogComponent, {
      disableClose: true,
      width: '500px',
      data: { careerPathID: this.careerPathId },
    });
  }
  navigateToSessions() {
    this.router.navigate(['sessions'], { relativeTo: this.route });
  }
}
