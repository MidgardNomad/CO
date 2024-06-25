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
  slideForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      slide: Ss;
      qAnswer: string;
    }
  ) {}

  ngOnInit(): void {}
  editSlide() {
    console.log(this.slideForm.value);
  }
}
