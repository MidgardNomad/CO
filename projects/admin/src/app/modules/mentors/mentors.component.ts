import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mentor } from 'DAL';
import { MentorDialogComponent } from '../../modal/mentor-dialog/mentor-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss'],
})
export class MentorsComponent implements OnInit {
  dataSource: Mentor[] = [];

  displayedColumns = ['name', 'age', 'experience', 'timezone'];

  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSource = this.route.snapshot.data['mentorsList'];
    const today = new Date().getFullYear();
    console.log(today);
  }

  onAddMentor() {
    this.matDialog.open(MentorDialogComponent, {
      width: '700px',
      data: {
        header: 'Add new Mentor',
      },
    });
  }

  navigateToMentor(data) {
    this.router.navigate(['/mentors', data.id]);
  }
}
