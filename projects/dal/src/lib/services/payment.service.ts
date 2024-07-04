import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPaymentIntent(reqBody) {
    return this.http
      .post(`${environment.api}payment/create-payment-intent`, reqBody)
      .toPromise();
  }
}
