import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { Mentor, MentorService } from 'DAL';
import { MentorScheduleDialogComponent } from 'projects/admin/src/app/modal/mentor-schedule-dialog/mentor-schedule-dialog.component';
import { AddImageComponent } from './add-image/add-image.component';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.scss'],
})
export class MentorProfileComponent implements OnInit {
  mentor: Mentor;
  mentorID: string;
  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private mentorServices: MentorService
  ) {}

  ngOnInit(): void {
    this.mentorID = this.route.snapshot.paramMap.get('id');
    this.mentor = this.route.snapshot.data['mentor'];
    this.getMySessionDetails();
  }

  // getDaySchedule(day) {
  //   Object
  // }

  getMySessionDetails() {}

  getMentorData() {
    this.mentorServices
      .getMentorByID(this.mentor.id)
      .subscribe((res) => (this.mentor = res));
  }

  editSchedule() {
    const dialogRed = this.matDialog.open(MentorScheduleDialogComponent, {
      width: '650px',
      data: {
        mentor: this.mentor,
      },
    });

    dialogRed.afterClosed().subscribe((res) => {
      console.log(res);
      this.getMentorData();
    });
  }

  // Edit Image For
  editImageProfile(mentor: Mentor) {
    const dialogRef = this.matDialog.open(AddImageComponent, {
      disableClose: true,
      data: mentor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
      // if (result) {
      //   this.mentorServices.updateMentorProfilePicture(
      //     this.mentorID,
      //     result.profilePicture
      //   );
      // }
    });
  }
}
