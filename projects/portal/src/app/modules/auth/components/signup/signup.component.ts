import {
  Component,
  ElementRef,
  OnInit,
  Renderer2 as Renderer,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CrudService } from 'DAL';
import { User } from 'DAL';
import { errorHandler } from '../../../../shared/functions/errorHandler';
import { loadingAnimation } from '../../../../shared/functions/loadingAnimation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('form') form: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  @ViewChild('alert') alert: ElementRef;
  loadingAnimation = loadingAnimation();
  invalidEmail = false;
  errMessage: string;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private crudService: CrudService,
    private renderer: Renderer,
    private router: Router
  ) {}

  private trimUserInput(input: string) {
    return input.trim().replace(input[0], input[0].toUpperCase());
  }
  ngOnInit(): void {}

  async onSignUp(userCradentials: NgForm) {
    this.isLoading = true;
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.form);
    const { userEmail, userPassword, userFirstName, userLastName } =
      userCradentials.value;
    try {
      const newUser = await this.authService.signUp(userEmail, userPassword);
      await newUser.user.updateProfile({
        displayName: `${this.trimUserInput(userFirstName)} ${this.trimUserInput(
          userLastName
        )}`,
        photoURL: '../../../../../assets/images/placeholder-avatar.svg',
      });
      await this.crudService.setSingleDoc('users', newUser.user.uid, {
        id: newUser.user.uid,
        displayName: newUser.user.displayName,
        photoURL: newUser.user.photoURL,
        isVerified: false,
        isPro: false,
        active: false,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        maxStreak: 0,
        currentStreak: 0,
        streakDays: [],
        deletedAt: null,
        deleted: false,
        courseList: [],
        connectedAccounts: [],
        bio: '',
      } as User);
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.isLoading = false;
      this.router.navigate(['profile', newUser.user.uid]);
    } catch (error) {
      this.invalidEmail = error.code === 'auth/invalid-email' ? true : false;
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.errMessage = errorHandler(error);
      this.renderer.setStyle(this.alert.nativeElement, 'display', 'block');
      this.isLoading = false;
    }
  }
}
