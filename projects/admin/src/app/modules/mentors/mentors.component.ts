import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mentor } from 'DAL';
import * as moment from 'moment-timezone';
import { MentorDialogComponent } from '../../modal/mentor-dialog/mentor-dialog.component';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss'],
})
export class MentorsComponent implements OnInit {
  dataSource: Mentor[] = [
    {
      name: 'Mahmoud',
      timeZone: moment.tz.guess(),
      birthdate: new Date(),
      experience: 1.5,
      expertise: ['Flutter', 'Angular', 'Express'],
      id: 'id',
      linkedInLink: 'www.linkedin.com',
      profilePicture: 'test',
      weeklySchedule: null,
    },
  ];

  displayedColumns = ['name', 'age', 'experience', 'timezone'];

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  onAddMentor() {
    this.matDialog.open(MentorDialogComponent, {
      width: '700px',
      data: {
        header: 'Add new Mentor',
      },
    });
  }

  navigateToMentor(data) {
    console.log(data);
  }
}
