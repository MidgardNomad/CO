import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService, PackagePricingService, PaymentService, User, UsersService } from 'DAL';
import { environment } from 'DAL';
import * as moment from 'moment';
declare var Stripe: any;

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss'],
})
export class SubscriptionDetailsComponent implements OnInit {
  stripe = Stripe(environment.stripeAPI);
  elements;
  cardElement;
  user: User;

  constructor(
    private paymentService: PaymentService,
    private usersService: UsersService,
    private packagePricingService: PackagePricingService,
    private coursesServices:CoursesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.initPaymentForm();
    
    // this.updateUserStatus()
  }

  getUser() {
    this.usersService.userDoc.subscribe((userAuthObj) => {
      this.user = userAuthObj;      
    });
  }

  initPaymentForm() {
    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async createPaymentIntent() {
    try {
      let reqBody = {
        amount: this.packagePricingService.getPackagePriceAndCurrency(this.user.country).price *100,
        userID: this.user.id,
        env: environment.env,
        name: this.user.displayName,
        email: this.user.email,
        currency: this.packagePricingService.getPackagePriceAndCurrency(this.user.country).currency,
      };
      const response: any = await this.paymentService.createPaymentIntent(
        reqBody
      );

      const clientSecret = response.data.clientSecret;

      // check if the paymentIntent is created successfully
      if (!clientSecret) {
        console.error('Error: Failed to create payment intent');
        return;
      }

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: this.cardElement,
          },
        }
      );

      if (error) {
        console.error(error);
        // alert('Payment failed: ' + error.message);
      } else {
        alert('Payment successful!');
        if (
          response?.['data']?.['envRealized'] &&
          response?.['data']?.['paymentID']
        ) {
          let obj = {
            env: response?.['data']?.['envRealized'],
            paymentID: response?.['data']?.['paymentID'],
          };
          let result:any=await this.checkPayment(obj);
          if (result?.['status'] && result?.['message'] === 'Payment Succeeded') {
            this.updateUserStatus();
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('Payment failed: ' + error.message);
    }
  }

  async checkPayment(obj) {
    return await this.paymentService.checkPayment(obj);
  }

  async updateUserStatus(){
    const course:{id:string}=await this.getFirstCourseID();    

    this.user.paid=true;
    this.user.sessionExpirationDate=moment().add(6,'M').toDate();
    const courseObj={
      courseId:course.id,
      chapterLevel:[],
      finished:null
    }
    this.user.courseList.push(courseObj);    

    await this.usersService.updateUserDoc(this.user).then(res=>{
      window.location.reload();
      // this.router.navigate(['/profile/',this.user.id])
    }).catch(err=>{
      console.log('user err',err);
      
    })
  }

  async getFirstCourseID():Promise<{id:string}>{
    return new Promise((resolve,reject)=>{
      this.coursesServices.getFirstCourse().subscribe({
        next:(res:any)=>{
          resolve(res)
        },
        error:()=>{
          reject(false)
        }
      })
    })
    
  }
}
