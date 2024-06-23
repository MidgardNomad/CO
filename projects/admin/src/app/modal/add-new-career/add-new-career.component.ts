import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CareerPathService } from 'DAL';

@Component({
  selector: 'app-add-new-career',
  templateUrl: './add-new-career.component.html',
  styleUrls: ['./add-new-career.component.scss']
})

export class AddNewCareerComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
  })

  constructor(
    private careerPathService: CareerPathService,
    public dialogRef: MatDialogRef<AddNewCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async saveData() {
    try {
      await this.careerPathService.addNewCareerPath(this.addForm.value.title, this.addForm.value.description);
      this.dialogRef.close();
    } catch (error) {

    }
  }
}
