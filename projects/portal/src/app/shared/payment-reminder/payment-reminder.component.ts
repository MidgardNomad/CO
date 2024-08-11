import { Component, Input, OnInit } from '@angular/core';
import { AuthService, PackagePricingService, User } from 'DAL';

export enum currency {
  EGP = 'EGP',
  USD = 'USD',
}

@Component({
  selector: 'app-payment-reminder',
  templateUrl: './payment-reminder.component.html',
  styleUrls: ['./payment-reminder.component.scss']
})
export class PaymentReminderComponent implements OnInit {

  @Input() user: User;

  currency: string = currency.EGP;
  price: number = 0;

  constructor(private auth: AuthService, private packagePricingService: PackagePricingService) { }

  ngOnInit(): void {
    this.getPackagePrice();
  }

  getPackagePrice() {
    if (this.user) {
      const obj = this.packagePricingService.getPackagePriceAndCurrency(this.user.country);
      this.price=obj.price;
      this.currency=obj.currency;
    }
  }



}
