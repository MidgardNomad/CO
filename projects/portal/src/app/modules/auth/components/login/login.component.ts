import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2 as Renderer,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'DAL';
import { errorHandler } from '../../../../shared/functions/errorHandler';
import { loadingAnimation } from '../../../../shared/functions/loadingAnimation';
import { UIComponentsService } from 'projects/portal/src/app/services/ui-components.service';
import { MatDialog } from '@angular/material/dialog';
import { VerifyEmailDialogComponent } from './verify-email-dialog/verify-email-dialog.component';
import { Subscription } from 'rxjs';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider,TwitterAuthProvider,signOut  } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: ElementRef;
  @ViewChild('loadingSpinner') loadingSpinner: ElementRef;
  @ViewChild('alert') alert: ElementRef;
  errMessage: string;
  isLoading = false;
  loadingAnimation = loadingAnimation();
  //Subs
  matDialogSub: Subscription;


  auth = getAuth();
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
  githubProvider = new GithubAuthProvider();
  twitterProvider = new TwitterAuthProvider();

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer,
    private uiService: UIComponentsService,
    private matDialog: MatDialog
  ) {}
    private uiService: UIComponentsService
  ) { }

  ngOnInit(): void {
    this.logOut();
  }

  async onLogin(userCradentials: NgForm) {
    const {
      userEmail,
      userPassword,
      rememberUser,
    }: {
      userEmail: string;
      userPassword: string;
      rememberUser: boolean | '';
    } = userCradentials.value;
    this.isLoading = true;
    this.loadingAnimation('block', 0.8, this.loadingSpinner, this.form);
    try {
      let user = await this.authService.signIn(
        userEmail,
        userPassword,
        rememberUser
      );
      if (user.user.emailVerified) {
        this.router.navigate(['profile', user.user.uid]);
        this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
        this.uiService.userLoginAction.next(true);
      } else {
        await this.authService.logout();
        this.isLoading = false;
        this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
        this.matDialogSub = this.matDialog
          .open(VerifyEmailDialogComponent)
          .afterClosed()
          .subscribe((userResponse) => {
            if (userResponse) {
              this.authService.verifyEmail(user.user);
              this.router.navigate(['auth/email-verification'], {
                state: { userEmail },
              });
            }
          });
      }
    } catch (error) {
      this.isLoading = false;
      this.loadingAnimation('none', 1, this.loadingSpinner, this.form);
      this.errMessage = errorHandler(error);
      this.renderer.setStyle(this.alert.nativeElement, 'display', 'block');
    }
  }

  ngOnDestroy(): void {
    if (this.matDialogSub) this.matDialogSub.unsubscribe();
  }

  googleSignIn() {
    console.log('google');
    signInWithPopup(this.auth, this.googleProvider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('user', user);
      this.completeLogin(user.uid);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  facebookSignIn() {
    console.log('facebook');

    signInWithPopup(this.auth, this.facebookProvider).then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log('facebook user', user);
      console.log('facebook accessToken', accessToken);


      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }

  githubLogin() {
    signInWithPopup(this.auth, this.githubProvider).then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }

  twitterLogin(){
    signInWithPopup(this.auth, this.twitterProvider).then((result) => {
      console.log('res',result);
      
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    // ...
  });
  }

  completeLogin(userID:string){    
    this.router.navigateByUrl(`/profile/${userID}`);
    this.uiService.userLoginAction.next(true);
  }

  async logOut() {

    signOut(this.auth).then(() => {
      console.log('sign out success');
      
      // Sign-out successful.
    }).catch((error) => {
      console.log('sign out fail');
      // An error happened.
    });


    // await this.authService.logout().then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })
  }
}
