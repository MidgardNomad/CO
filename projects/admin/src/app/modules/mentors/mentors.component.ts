import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mentor, MentorService } from 'DAL';
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
    private router: Router,
    private mentorServices:MentorService
  ) {}

  ngOnInit(): void {
    this.dataSource = this.route.snapshot.data['mentorsList'];
  }

  onAddMentor() {
    const mentorDialog=this.matDialog.open(MentorDialogComponent, {
      width: '700px',
      data: {
        header: 'Add new Mentor',
      },
    });

    mentorDialog.afterClosed().subscribe((res)=>{
      console.log(res);
      
      if (res===true) {
        this.getAll();
      }
    })
  }

  getAll(){
    this.mentorServices.getMentors().subscribe((res)=>{
      console.log(res);
      
      this.dataSource=res;
    })
  }

  navigateToMentor(data) {
    this.router.navigate(['/mentors', data.id]);
  }
}
