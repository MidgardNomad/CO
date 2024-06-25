import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ss } from 'DAL';

@Component({
  selector: 'app-edit-slide-dialog',
  templateUrl: './edit-slide-dialog.component.html',
  styleUrls: ['./edit-slide-dialog.component.scss'],
})
export class EditSlideDialogComponent implements OnInit {
  slideForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      slide: Ss;
      qAnswer: string;
    }
  ) {}

  ngOnInit(): void {
    this.slideForm = new FormGroup({
      slideType: new FormControl(this.data.slide.type, [Validators.required]),
      slideText: new FormControl(this.data.slide.text, [
        Validators.required,
        Validators.maxLength(240),
      ]),
      slideQuestion: new FormControl(this.data.slide.question, [
        Validators.required,
        Validators.maxLength(240),
      ]),
      mcqAnswer: new FormControl(
        this.data.slide.mcqAnswer || this.data.slide.mcqAnswer === 0
          ? this.data.slide.mcqAnswer
          : null
      ),
      firstOption: new FormControl(this.data.slide.options[0] || null),
      secondOption: new FormControl(this.data.slide.options[1] || null),
      thirdOption: new FormControl(this.data.slide.options[2] || null),
      fourthOption: new FormControl(this.data.slide.options[3] || null),
      fillAnswer: new FormControl(this.data.qAnswer || null),
    });
  }
  editSlide() {
    console.log(this.slideForm.value);
  }
}
