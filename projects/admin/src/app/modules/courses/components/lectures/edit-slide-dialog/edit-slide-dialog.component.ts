import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ss } from 'DAL';

@Component({
  selector: 'app-edit-slide-dialog',
  templateUrl: './edit-slide-dialog.component.html',
  styleUrls: ['./edit-slide-dialog.component.scss'],
})
export class EditSlideDialogComponent implements OnInit {
  private imageFile: File;
  slideTypeForm: FormGroup;
  slideTextForm: FormGroup;
  slideMCQForm: FormGroup;
  slideQForm: FormGroup;
  slideImageForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      slide: Ss;
    }
  ) {}

  ngOnInit(): void {
    this.slideTypeForm = new FormGroup({
      slideType: new FormControl(this.data.slide.type, Validators.required),
    });
    this.slideTextForm = new FormGroup({
      slideText: new FormControl(this.data.slide.text, [
        Validators.required,
        Validators.maxLength(240),
      ]),
    });
    this.slideImageForm = new FormGroup({
      slideImageText: new FormControl(this.data.slide.text, [
        Validators.required,
        Validators.maxLength(240),
      ]),
    });
    this.slideMCQForm = new FormGroup({
      slideMCQQuestion: new FormControl(this.data.slide.question, [
        Validators.required,
        Validators.maxLength(240),
      ]),
      slideMCQAnswer: new FormControl(this.data.slide.mcqAnswer, [
        Validators.required,
        Validators.max(3),
        Validators.min(0),
      ]),
      slideOptionOne: new FormControl(
        this.data.slide.options[0],
        Validators.required
      ),
      slideOptionTwo: new FormControl(
        this.data.slide.options[1],
        Validators.required
      ),
      slideOptionThree: new FormControl(this.data.slide.options[2]),
      slideOptionFour: new FormControl(this.data.slide.options[3]),
    });
  }

  onFileSelected(file) {
    this.imageFile = file;
  }

  editSlide() {
    switch (this.slideTypeForm.get('slideType').value) {
      case 'text':
        console.log(this.slideTextForm.get('slideText').value);
        break;
      case 'text-image':
        console.log(this.slideImageForm.get('slideImageText').value);
        break;
      case 'mcq':
        console.log(this.slideMCQForm.value);
        break;
      case 'q-fill':
        break;
    }
  }
}
