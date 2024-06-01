import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-career',
  templateUrl: './add-new-career.component.html',
  styleUrls: ['./add-new-career.component.scss']
})
export class AddNewCareerComponent implements OnInit {
    addForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    courseList: new FormControl(null)
  })

  constructor(
    public dialogRef: MatDialogRef<AddNewCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveData() {
    console.log(this.addForm.value)
  }
}
