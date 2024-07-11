import {
  Component,
  ElementRef,
  OnInit,
  Renderer2 as Renderer,
  ViewChild,
} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CrudService } from 'DAL';
import { User } from 'DAL';
import { loadingAnimation } from '../../../../shared/functions/loadingAnimation';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';
import { errorHandler } from 'projects/portal/src/app/shared/functions/errorHandler';

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
  countries = {};
  countryList: string[] = [];
  userCountry: string;
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private crudService: CrudService,
    private renderer: Renderer,
    private router: Router,
    private uiService: UIComponentsService
  ) {}

  private trimUserInput(input: string) {
    return input.trim().replace(input[0], input[0].toUpperCase());
  }

  private getCountryCode(countryName: string) {
    return Object.keys(this.countries).find(
      (key) => this.countries[key] === countryName
    );
  }

  getCountries(lang = 'en') {
    const A = 65;
    const Z = 90;
    const countryName = new Intl.DisplayNames([lang], { type: 'region' });
    const countries = {};
    for (let i = A; i <= Z; ++i) {
      for (let j = A; j <= Z; ++j) {
        let code = String.fromCharCode(i) + String.fromCharCode(j);
        let name = countryName.of(code);
        if (code !== name) {
          countries[code] = name;
        }
      }
    }
    this.countries = countries;

    return Object.values(countries).sort() as string[];
  }
  ngOnInit(): void {
    this.countryList = this.getCountries();
    // this.userCountry = localStorage.getItem('country');
    this.signUpForm = new FormGroup({
      userFirstName: new FormControl(null, Validators.required),
      userLastName: new FormControl(null, Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      country: new FormControl(null, [Validators.required]),
    });
  }

  async onSignUp(userCradentials: NgForm) {
    // this.isLoading = true;
    // this.loadingAnimation('block', 0.8, this.loadingSpinner, this.form);
    const { userEmail, userPassword, userFirstName, userLastName, country } =
      userCradentials.value;
    console.log(userCradentials.value);

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
        email:userEmail,
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
        countryCode: this.getCountryCode(country),
      } as User);
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.isLoading = false;
      this.router.navigate(['profile', newUser.user.uid]);
      this.uiService.userSignupAction.next(true);
    } catch (error) {
      this.invalidEmail = error.code === 'auth/invalid-email' ? true : false;
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.errMessage = errorHandler(error);
      this.renderer.setStyle(this.alert.nativeElement, 'display', 'block');
      this.isLoading = false;
    }
  }
}
