import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mentor, MentorService, dayTime, sessionForm } from 'DAL';

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
    public matDialogRef: MatDialogRef<MentorScheduleDialogComponent>
  ) {}

  ngOnInit(): void {
    this.scheduleForm = new FormGroup({
      day: new FormControl(null, Validators.required),
      from: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
    });
  }

  async onAddSchedule() {
    try {
      const { day,from,duration } = this.scheduleForm.value;
      this.data.mentor.freeDay=day;
      this.data.mentor.from=from;
      this.data.mentor.duration=duration;

      console.log(this.data.mentor);
      
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
        this.data.mentor);


      //mahmoud
      // const { day, from, duration } = this.scheduleForm.value;
      // const dayTime: dayTime = {
      //   time: from,
      //   duration,
      // };

      // console.log(this.data.mentor.weeklySchedule.find((sc) => sc.day === day));

      // if (this.data.mentor.weeklySchedule.find((sc) => sc.day === day)) {
      //   this.data.mentor.weeklySchedule
      //     .find((sc) => sc.day === day)
      //     .from.push(dayTime);
      // } else {
      //   this.data.mentor.weeklySchedule.push({
      //     day: day,
      //     from: [dayTime],
      //   } as sessionForm);
      // }
      // await this.mentorService.addToSessionSchedule(
      //   this.data.mentor.id,
      //   this.data.mentor
      // );

      this.matDialogRef.close(true);
    } catch (error) {
      console.log(error);
    }
  }
}
