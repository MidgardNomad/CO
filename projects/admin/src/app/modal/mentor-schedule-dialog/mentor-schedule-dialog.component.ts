import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mentor, MentorService } from 'DAL';
import { from } from 'rxjs';

@Component({
  selector: 'app-mentor-schedule-dialog',
  templateUrl: './mentor-schedule-dialog.component.html',
  styleUrls: ['./mentor-schedule-dialog.component.scss'],
})
export class MentorScheduleDialogComponent implements OnInit {
  scheduleForm: FormGroup;
  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednsedy',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  durations = [60];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { mentor: Mentor },
    private mentorService: MentorService,
    private matDialogRef: MatDialogRef<MentorScheduleDialogComponent>
  ) {}

  ngOnInit(): void {
    this.scheduleForm = new FormGroup({
      day: new FormControl(null, Validators.required),
      // from: new FormControl(null, Validators.required),
      // duration: new FormControl(null, Validators.required),
    });
  }

  async onAddSchedule() {
    try {
      const { day } = this.scheduleForm.value;
      this.data.mentor.freeDay=day;


      // this.data.mentor.weeklySchedule.push({
      //   day,
      //   from,
      //   duration,
      // });
      // await this.mentorService.addToSessionSchedule(
      //   this.data.mentor.id,
      //   this.data.mentor.weeklySchedule
      // );

      await this.mentorService.updateMentor(
        this.data.mentor.id,
        this.data.mentor
      );

      this.matDialogRef.close(true);
    } catch (error) {
      console.log(error);
    }
  }
}
