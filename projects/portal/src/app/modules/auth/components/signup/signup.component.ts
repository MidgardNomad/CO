import {
  Component,
  ElementRef,
  OnInit,
  Renderer2 as Renderer,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UsersService, User } from 'DAL';
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
    private usersService: UsersService,
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

  private disableEnableFormControls(action: 'enable' | 'disable') {
    if (action === 'disable') {
      this.signUpForm.get('userFirstName').disable();
      this.signUpForm.get('userLastName').disable();
      this.signUpForm.get('userEmail').disable();
      this.signUpForm.get('userPassword').disable();
      this.signUpForm.get('country').disable();
      this.signUpForm.get('userAgrement').disable();
    } else if (action === 'enable') {
      this.signUpForm.get('userFirstName').enable();
      this.signUpForm.get('userLastName').enable();
      this.signUpForm.get('userEmail').enable();
      this.signUpForm.get('userPassword').enable();
      this.signUpForm.get('country').enable();
      this.signUpForm.get('userAgrement').enable();
    }
  }

  private getCountries(lang = 'en') {
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
    this.userCountry = localStorage.getItem('country') || null;

    this.signUpForm = new FormGroup({
      userFirstName: new FormControl(null, Validators.required),
      userLastName: new FormControl(null, Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      country: new FormControl(this.userCountry || '', [Validators.required]),
      userAgrement: new FormControl(null, Validators.required),
    });
  }

  async onSignUp() {
    this.isLoading = true;
    this.disableEnableFormControls('disable');
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.form);
    const { userEmail, userPassword, userFirstName, userLastName, country } =
      this.signUpForm.value;

    try {
      const newUser = await this.authService.signUp(userEmail, userPassword);
      await newUser.user.updateProfile({
        displayName: `${this.trimUserInput(userFirstName)} ${this.trimUserInput(
          userLastName
        )}`,
        photoURL: '../../../../../assets/images/placeholder-avatar.svg',
      });
      await this.usersService.createUserDoc(
        newUser,
        country,
        this.getCountryCode(country)
      );
      await this.authService.verifyEmail(newUser.user);
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.isLoading = false;
      await this.authService.logout();
      this.router.navigate(['auth/email-verification'], {
        state: { userEmail },
      });

      // this.usersService.getUser();
      // this.router.navigate(['profile', newUser.user.uid]);
      // this.uiService.userSignupAction.next(true);
    } catch (error) {
      console.log(error);
      this.disableEnableFormControls('enable');
      this.invalidEmail = error.code === 'auth/invalid-email' ? true : false;
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.errMessage = errorHandler(error);
      this.renderer.setStyle(this.alert.nativeElement, 'display', 'block');
      this.isLoading = false;
    }
  }
}
