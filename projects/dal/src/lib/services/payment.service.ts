import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  createPaymentIntent(obj){
    return this.http.post(`${environment.api}payment/create-payment-intent`,obj).toPromise();
  }

  checkPayment(obj){
    return this.http.post(`${environment.api}payment/check-payment`,obj).toPromise();
  }
}
