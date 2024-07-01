import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  
  
  // constructor() {}
  constructor(private http:HttpClient) {}
  
  ngOnInit(): void {   
    this.initPaymentForm();
  }
  

  initPaymentForm() {
    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');
    this.cardElement.mount('#card-element');
    console.log();
    
  }

  async createPaymentIntent() {
    try {
      let reqBody = {
        amount: 15000,
        userID: "userID-322",
        env: 'test',
        name: "M E",
        email: "hozay@gmail.com",
        currency: "egp"
      }
      const response: any = await this.http.post(`${environment.api}payment/create-payment-intent`,reqBody).toPromise();
      console.log('response',response);
      
      const { clientSecret } = response.data.data;
      console.log("clientSecret ==> ", clientSecret);

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
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('Payment failed: ' + error.message);
    }
  }
}