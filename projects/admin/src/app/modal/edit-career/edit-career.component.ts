import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-career',
  templateUrl: './edit-career.component.html',
  styleUrls: ['./edit-career.component.scss']
})
export class EditCareerComponent implements OnInit {
  
  
  editForm:FormGroup = new FormGroup({
    No:new FormControl(null),
    Career_name:new FormControl(null),
    Hours:new FormControl(null),
    Lessons_number:new FormControl(null),
    Details:new FormControl(null)
  })

  constructor(
    public dialogRef: MatDialogRef<EditCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
