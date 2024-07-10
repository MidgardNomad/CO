import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Chapter,
  ChapterLevel,
  CoursesService,
  Lecture,
  LectureLevel,
  User,
} from 'DAL';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  user: User;
  isChapterInactive = true;
  chapterLectures: Lecture[];
  userLectures: LectureLevel[];
  @Input() chapter: Chapter;
  @Input() i: number;
  @Input() userChapter: ChapterLevel;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.coursesService
      .getAllLectures(
        this.route.snapshot.paramMap.get('courseID'),
        this.chapter.id
      )
      .subscribe({
        next: (lectures) => {
          this.chapterLectures = lectures;
        },
        error: (err) => console.log(err),
      });

    if (this.chapter.id === this.userChapter?.chapterId) {
      this.isChapterInactive = false;
    }
    this.userLectures = this.userChapter
      ? this.userChapter?.lectureLevel
      : null;
  }
}
