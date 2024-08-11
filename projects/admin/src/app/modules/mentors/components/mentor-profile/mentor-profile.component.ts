import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { Mentor, MentorService } from 'DAL';
import { MentorScheduleDialogComponent } from 'projects/admin/src/app/modal/mentor-schedule-dialog/mentor-schedule-dialog.component';
import * as moment from 'moment-timezone';
import { AddImageComponent } from './add-image/add-image.component';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.scss'],
})
export class MentorProfileComponent implements OnInit {
  mentor: Mentor;
  mentorID: string;
  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  students:number=0;
  day;

  reminderSession;

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private mentorServices: MentorService
  ) {}

  async ngOnInit() {
    this.mentorID = this.route.snapshot.paramMap.get('id');
    this.mentor = this.route.snapshot.data['mentor'];
    console.log(this.mentor);
    
    this.getMySessionDetails();

    this.getTimeAndDate(this.mentor.from, this.mentor.freeDay);
    this.students = await this.getNumberOfBookedSession(this.day);

    this.getReminderSession()
  }

  // getDaySchedule(day) {
  //   Object
  // }

  getMySessionDetails() {}

  getDayIndex(day){
    return this.weekdays.findIndex(res=>res===day)
  }

  getMentorData(){
    this.mentorServices.getMentorByID(this.mentor.id).subscribe(res=>this.mentor=res);
  }

  editSchedule() {
    const dialogRed = this.matDialog.open(MentorScheduleDialogComponent, {
      width: '650px',
      data: {
        mentor: this.mentor,
      },
    });

    dialogRed.afterClosed().subscribe(async(res) => {
      console.log(res);
      this.getMentorData();
      this.students=await this.getNumberOfBookedSession(this.day);
    });
  }

  // Edit Image For
  editImageProfile(mentor: Mentor) {
    const dialogRef = this.matDialog.open(AddImageComponent, {
      disableClose: true,
      data: mentor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
      // if (result) {
      //   this.mentorServices.updateMentorProfilePicture(
      //     this.mentorID,
      //     result.profilePicture
      //   );
      // }
    });
  }

  getTimeAndDate(time: string, day: string) {

    this.day = new Date();
    this.day.setDate(this.day.getDate() + ((this.getDayIndex(day) + (7 - this.day.getDay())) % 7));

    let userTime=this.convertTime(time,this.mentor.timeZone,'Africa/Cairo');

    this.day.setHours(+userTime.split(':')[0]);
    this.day.setMinutes(+userTime.split(':')[1]);
    this.day.setSeconds(0);

    if (this.day.getDate() === new Date().getDate()) {
      this.day.setDate(this.day.getDate() + 7);
    }    
    return this.day;   

  }

  convertTime(time:string,sessionTZ:string,userTZ:string){

    const cairoTime = moment.tz(time, 'HH:mm', sessionTZ);

    // Convert to user Time (ET)
    const easternTime = cairoTime.clone().tz(userTZ);

    return easternTime.format('HH:mm');

  }

  getNumberOfBookedSession(dateTime:Date):Promise<number>{
    // console.log(dateTime);
    dateTime =new Date(dateTime);
    return new Promise((resolve,reject)=>{
      const date=`${dateTime.getMonth()+1}-${dateTime.getDate()}-${dateTime.getFullYear()}`; 
      
      this.mentorServices.getAllStudentReservedSession(this.mentor.freeDay,date).subscribe(res=>{
        console.log('studnet reserved session',res);
        resolve(res?.length)
        
      })
    })

    //  this.students;
  }

  getReminderSession(){
    console.log(this.day);
    
    let sessionDate=`${this.day.getMonth() + 1}-${this.day.getDate()}-${this.day.getFullYear()}`;
    this.mentorServices.getMentorSessions(this.mentor.id).subscribe((res)=>{
      console.log(res);
      if (res.length >0) {
        const index=res.findIndex(ele=>ele['sessionDate'] === sessionDate);
        if (index>=0) {
          res.splice(index,1);
        }
      }
      this.reminderSession=res;
      this.reminderSession.forEach(async(element) => {
        element['studnetNum']=await this.getNumberOfBookedSession(element.sessionDate);
        element.sessionDate=`${element.sessionDate} ${element.sessionTime}`
      });
    })
  }
}
