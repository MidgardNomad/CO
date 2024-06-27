import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService, Lecture } from 'DAL';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chapter-lectures',
  templateUrl: './chapter-lectures.component.html',
  styleUrls: ['./chapter-lectures.component.scss'],
})
export class ChapterLecturesComponent implements OnInit {
  @Input() chapterID: string;
  lectures: Observable<Lecture[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.lectures = this.coursesService.getAllLectures(
      this.route.snapshot.paramMap.get('courseID'),
      this.chapterID
    );
  }

  navigateToLecture(lectureID: string) {
    this.router.navigate(['chapter', this.chapterID, 'lecture', lectureID], {
      relativeTo: this.route,
      queryParams: { s: 0 },
    });
  }
}
