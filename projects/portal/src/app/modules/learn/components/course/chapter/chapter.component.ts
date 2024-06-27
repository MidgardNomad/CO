import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter, CoursesService, Lecture } from 'DAL';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  @Input() chapters: Chapter[];

  constructor() {}

  ngOnInit(): void {}
}
