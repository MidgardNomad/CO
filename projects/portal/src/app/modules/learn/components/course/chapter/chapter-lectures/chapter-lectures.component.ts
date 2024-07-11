import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecture, LectureLevel } from 'DAL';

@Component({
  selector: 'app-chapter-lectures',
  templateUrl: './chapter-lectures.component.html',
  styleUrls: ['./chapter-lectures.component.scss'],
})
export class ChapterLecturesComponent implements OnInit {
  @Input() chapterID: string;
  @Input() lectures: Lecture[];
  @Input() userLectures: LectureLevel[];
  userLecturesID: string[];
  isLectureInactive = true;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userLecturesID = this.userLectures
      ? this.userLectures.map((lecutresProgress) => lecutresProgress.lectureId)
      : [];
  }

  navigateToLecture(lectureID: string, lecture: Lecture) {
    this.router.navigate(['chapter', this.chapterID, 'lecture', lectureID], {
      relativeTo: this.route,
      queryParams: { s: 0 },
      state: { activeLecture: lecture },
    });
  }
}
