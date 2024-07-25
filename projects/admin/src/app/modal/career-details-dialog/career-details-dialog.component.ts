import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CareerPathService, Course, CoursesService } from 'DAL';

@Component({
  selector: 'app-career-details-dialog',
  templateUrl: './career-details-dialog.component.html',
  styleUrls: ['./career-details-dialog.component.scss'],
})
export class CareerDetailsDialogComponent implements OnInit {
  courses: Course[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { careerPathID: string },
    private coursesService: CoursesService,
    private careerPathService: CareerPathService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  async onAddCourseToCareer(course: Course) {
    try {
      await this.careerPathService.addCourseToCareerPath(
        course,
        this.data.careerPathID
      );
    } catch (error) {
      console.log(error);
    }
  }
}
