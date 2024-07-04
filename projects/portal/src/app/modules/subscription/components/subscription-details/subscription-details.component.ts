import { Component, OnInit } from '@angular/core';
import { PaymentService, User, UsersService } from 'DAL';
import { environment } from 'projects/portal/src/environments/environment';
declare var Stripe: any;

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {

  stripe = Stripe(environment.stripeAPI);
  elements;
  cardElement;
  user:User;
  
  
  constructor(private paymentService:PaymentService,private userServices:UsersService) {}
  
  ngOnInit(): void {   
    this.getUser();
    this.initPaymentForm();
  }

  getUser(){
    this.userServices.userDocData.subscribe(res=>{
      this.user=res;
      console.log('user',res)
    }) 
  }
  

  initPaymentForm() {
    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async createPaymentIntent() {
    try {
      let reqBody = {
        amount: 15000,
        userID: this.user.id,
        env: environment.env,
        name: this.user.displayName,
        email: this.user.email,
        currency: "egp"
      }
      const response: any = await this.paymentService.createPaymentIntent(reqBody);
      console.log('response',response);
      
      const clientSecret = response.data.clientSecret;
      console.log('clientSecret',clientSecret);

      // check if the paymentIntent is created successfully
      if (!clientSecret) {
        console.error('Error: Failed to create payment intent');
        return;
      }


      const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.cardElement,
        }
      });

      if (error) {
        console.error(error);
        // alert('Payment failed: ' + error.message);
      } else {
        alert('Payment successful!');
        if (response?.['data']?.['envRealized'] && response?.['data']?.['paymentID']) {
          let obj={
            env:response?.['data']?.['envRealized'],
            paymentID:response?.['data']?.['paymentID']
          }
          await this.checkPayment(obj);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('Payment failed: ' + error.message);
    }
  }

  async checkPayment(obj){    
    const response: any = await this.paymentService.checkPayment(obj)
    console.log('response',response);
  }
}