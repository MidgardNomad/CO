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
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(private route: ActivatedRoute, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.mentor = this.route.snapshot.data['mentor'];
  }

  navigateToMentorLinkedInProfile() {
    window.open(this.mentor.linkedInLink);
  }

  editSchedule() {
    this.matDialog.open(MentorScheduleDialogComponent);
  }
}
