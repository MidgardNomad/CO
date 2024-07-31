import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { Mentor } from 'DAL';
import { MentorScheduleDialogComponent } from 'projects/admin/src/app/modal/mentor-schedule-dialog/mentor-schedule-dialog.component';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.scss'],
})
export class MentorProfileComponent implements OnInit {
  mentor: Mentor;
  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(private route: ActivatedRoute, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.mentor = this.route.snapshot.data['mentor'];
  }

  // getDaySchedule(day) {
  //   Object
  // }

  editSchedule() {
    this.matDialog.open(MentorScheduleDialogComponent, {
      width: '650px',
      data: {
        mentor: this.mentor,
      },
    });
  }
}
