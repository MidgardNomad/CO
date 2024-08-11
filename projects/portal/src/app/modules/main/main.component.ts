import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { UIComponentsService } from '../../services/ui-components.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'DAL';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  showHeaderAndFooter = true;
  uiServiceSub: Subscription;
  userServiceSub: Subscription;
  constructor(
    private uiService: UIComponentsService,
    private changeDetctorRef: ChangeDetectorRef,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.userService.userDoc !== null) {
      this.userServiceSub = this.userService.userDoc?.subscribe(
        async (userDate) => {
          console.log('userDate',userDate);
          
          const lastStreakDay=0;
          if (userDate.streakDays.length) {
            const lastStreakDay = (
              (
                userDate.streakDays[userDate.streakDays.length - 1] as any
              ).toDate() as Date
            ).getDate();
          }

          

          const today = new Date().getDate();

          if (today - lastStreakDay > 1 && userDate.currentStreak !== 0) {
            await this.userService.TareCurrentStreak(userDate.id);
          }
        }
      );
    }
    this.uiServiceSub = this.uiService.hideHeaderAndFooter.subscribe((hide) => {
      this.showHeaderAndFooter = hide;
      this.changeDetctorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    console.log('main component has been destroyed');
    this.uiServiceSub.unsubscribe();
    this.userServiceSub.unsubscribe();
  }
}
