import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CareerPathService } from 'DAL';

@Component({
  selector: 'app-edit-career',
  templateUrl: './edit-career.component.html',
  styleUrls: ['./edit-career.component.scss']
})

export class EditCareerComponent implements OnInit {

  editForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.cpTitle),
    description: new FormControl(this.data.cpDescription),
  })

  constructor(
    private careerPathService: CareerPathService,
    public dialogRef: MatDialogRef<EditCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cpID: string, cpTitle: string, cpDescription: string }
  ) { }

  ngOnInit(): void {
    console.log(this.data.cpID, this.data.cpTitle, this.data.cpDescription)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async updateData() {
    try {
      await this.careerPathService.updateCareerPath(this.data.cpID, this.editForm.value.title, this.editForm.value.description);
      this.dialogRef.close();
    } catch (error) {
      console.log(error)
    }
  }

}
