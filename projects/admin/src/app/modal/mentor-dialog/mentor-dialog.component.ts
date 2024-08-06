import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MentorService, Mentor } from 'DAL';

@Component({
  selector: 'app-mentor-dialog',
  templateUrl: './mentor-dialog.component.html',
  styleUrls: ['./mentor-dialog.component.scss'],
})
export class MentorDialogComponent implements OnInit {
  //To Ensure that a mentor cannot be younger than 18 years (To Avoid mistakes)
  maxdate = new Date();
  mentorForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string;
    },
    private mentorSerivce: MentorService,
    public dialog:MatDialogRef<MentorDialogComponent>

  ) {}

  ngOnInit(): void {
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
    this.mentorForm = new FormGroup({
      mentorName: new FormControl(null, Validators.required),
      //Age is calculated from the date picker (pick the mentor's birthday)
      birthdate: new FormControl(null, Validators.required),
      experience: new FormControl(null, Validators.required),
      linkedIn: new FormControl(null, Validators.required),
      expertise: new FormArray([new FormControl(null, Validators.required)]),
    });
  }

  async onAddMentor() {
    try {
      const { mentorName, birthdate, experience, linkedIn, expertise } =
        this.mentorForm.value;

      await this.mentorSerivce.addMentor(<Mentor>{
        name: mentorName,
        linkedInLink: linkedIn,
        birthdate,
        experience,
        expertise,
        profilePicture: '../../../assets/images/placeholder-avatar.svg',
        timeZone: 'Africa/Cairo',
        weeklySchedule: [],
      });

      this.dialog.close({status:true});

    } catch (error) {
      console.log(error);

      this.dialog.close({status:false});

    }
  }

  get controls() {
    return (this.mentorForm.get('expertise') as FormArray).controls;
  }

  onAddExpertise() {
    const expertiseControl = new FormControl(null, Validators.required);
    (this.mentorForm.get('expertise') as FormArray).push(expertiseControl);
  }
}
