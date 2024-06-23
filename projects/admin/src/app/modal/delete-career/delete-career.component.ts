import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-career',
  templateUrl: './delete-career.component.html',
  styleUrls: ['./delete-career.component.scss']
})

export class DeleteCareerComponent implements OnInit {
  deleteForm: FormGroup = new FormGroup({
  })

  constructor(
    public dialogRefDelete: MatDialogRef<DeleteCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRefDelete.close();
  }
}
