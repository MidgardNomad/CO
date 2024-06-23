import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SsType } from 'DAL';
import { SlideData } from '../types/slideData';

@Component({
  selector: 'app-edit-slide-dialog',
  templateUrl: './edit-slide-dialog.component.html',
  styleUrls: ['./edit-slide-dialog.component.scss'],
})
export class EditSlideDialogComponent implements OnInit {
  slideType = 'text';

  slideForm = new FormGroup({
    slideType: new FormControl(this.slideType),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      slideId: string;
      slideType: string;
      slideData: SlideData;
    }
  ) {}

  ngOnInit(): void {
    this.slideType = this.data.slideType;
  }
  onSubmit(form: NgForm, slideType: SsType) {}
}
